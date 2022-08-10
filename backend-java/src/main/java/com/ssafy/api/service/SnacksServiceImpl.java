package com.ssafy.api.service;

import com.ssafy.api.request.snacks.SnacksReplyPostReq;
import com.ssafy.api.request.snacks.SnacksUploadReq;
import com.ssafy.api.response.snacks.SnacksReplyRes;
import com.ssafy.api.response.snacks.SnacksRes;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SnacksServiceImpl implements SnacksService{

    private final SnacksLikeRepository snacksLikeRepository;
    private final SnacksRepository snacksRepository;
    private final SnacksTagRepository snacksTagRepository;
    private final SnacksReplyRepository snacksReplyRepository;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    @Value("${cloud.aws.region.static}")
    private String region;

    // 스낵스 조회
    @Override
    public Slice<SnacksRes> findAll(Pageable pageable, String userId) {
        PageRequest pageRequest = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize());
        Slice<SnacksRes> slice = snacksRepository.findAll(pageRequest)
                .map(s -> SnacksRes.of(s, snacksLikeRepository.findByUser_UserIdAndSnacks_SnacksId(userId, s.getSnacksId()).isPresent()));
        return slice;
    }

    // 특정 스낵스 조회
    @Override
    public SnacksRes getCertainSnacks(Long snacksId, String userId) {
        Optional<Snacks> snacks = snacksRepository.findBySnacksId(snacksId);
        if(snacks.isPresent()) {
            boolean isLike = snacksLikeRepository.findByUser_UserIdAndSnacks_SnacksId(userId, snacksId).isPresent();
            return SnacksRes.of(snacks.get(), isLike);
        }
        return null;
    }

    // 스낵스 좋아요 및 취소
    @Override
    public String likeSnacks(User user, Long snacksId) {
        Optional<SnacksLike> like = snacksLikeRepository.findByUser_UserIdAndSnacks_SnacksId(user.getUserId(), snacksId);
        Optional<Snacks> snacks = snacksRepository.findBySnacksId(snacksId);
        // 스낵스 유무 판별
        if(!snacks.isPresent()) {
            return "Invalid Snacks";
        }
        // 이미 좋아요를 누른 스낵스의 경우 좋아요 취소
       if (like.isPresent()){
           SnacksLike snacksLike = SnacksLike.builder().snacksLikeId(like.get().getSnacksLikeId()).build();
           snacksLikeRepository.delete(snacksLike);
           snacksRepository.dislikeSnacks(snacksId);
           return "dislike";
       }
       SnacksLike snacksLike = SnacksLike.builder()
               .user(user)
               .snacks(snacksRepository.findBySnacksId(snacksId).get())
               .build();
       snacksLikeRepository.save(snacksLike);
       snacksRepository.likeSnacks(snacksId);
       return "like";
    }

    // 댓글 작성
    @Override
    public SnacksReply createReply(SnacksReplyPostReq replyInfo, User user) {
        Optional<Snacks> snacks = snacksRepository.findBySnacksId(replyInfo.getSnacksId());
        if(snacks.isPresent()) {
            SnacksReply reply = SnacksReply.builder()
                        .user(user)
                        .snacks(snacks.get())
                        .contents(replyInfo.getContents())
                        .build();
            return snacksReplyRepository.save(reply);
        }
        return null;
    }

    // 스낵스 업로드
    public Snacks uploadSnacks(SnacksUploadReq snacksInfo, User user){
        Snacks snacks = Snacks.builder()
                .snacksTitle(snacksInfo.getSnacksTitle())
                .user(user)
                .build();
        Snacks snack = snacksRepository.save(snacks);
        Snacks snackss = Snacks.builder()
                .snacksTitle(snack.getSnacksTitle())
                .snacksId(snack.getSnacksId())
                .user(user)
                .snacksContents("https://" + bucket + ".s3." + region + ".amazonaws.com/vid/snacks/" + snack.getSnacksId())
                .build();
        snacksRepository.save(snackss);
        // 태그 추가
        uploadTags(snacksInfo, snackss);
        return snackss;
    }

    // 7일 이내 가장 많이 태그된 인기 태그 조회
    @Override
    public List<String> getPopularTags() {
        return snacksTagRepository.findSnacksPopularTags();
    }

    @Override
    public List<SnacksReplyRes> getReplybySnacksId(Long snacksId) {
        List<SnacksReplyRes> list = snacksReplyRepository.findBySnacks_SnacksId(snacksId)
                .stream().map(s -> SnacksReplyRes.of(s)).collect(Collectors.toList());
        return list;
    }

    // 태그 업로드
    public void uploadTags(SnacksUploadReq snacksInfo, Snacks snack){
        String[] snacksTags = snacksInfo.getSnacksTag().split(",");
        for (String tag:snacksTags) {
            SnacksTag snacksTag = SnacksTag.builder()
                    .snacks(snack)
                    .snacksTagContent(tag)
                    .build();
            snacksTagRepository.save(snacksTag);
        }

    }
}
