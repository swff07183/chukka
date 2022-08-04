package com.ssafy.api.controller;

import com.ssafy.api.request.review.ReviewPostReq;
import com.ssafy.api.response.Review.ReviewGetRes;
import com.ssafy.api.service.ReviewService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.entity.Review;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "대강의 댓글 API", tags = {"Review"})
@RestController
@RequestMapping("lectures/{lecId}")
public class ReviewController {

    // 리뷰 작성 ========================================================================================================
    @Autowired
    ReviewService reviewService;

    @PostMapping("/")
    @ApiOperation(value = "댓글 작성", notes = "댓글을 작성한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공")
    })
    public ResponseEntity<BaseResponseBody> createReview(
            @RequestBody @ApiParam(value = "댓글 작성 정보", required = true) ReviewPostReq reviewPostReq) {
        Review review = reviewService.createReview(reviewPostReq);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", null));
    }

    // 강의별 리뷰 조회 ==================================================================================================
    @GetMapping("/")
    @ApiOperation(value = "리뷰 조회", notes = "강의별 전체 리뷰를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = ReviewGetRes.class)
    })
    public ResponseEntity<BaseResponseBody> findByLecId(int lecId) {
        List<ReviewGetRes> review = reviewService.findByLecId(lecId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", review));
    }

    @DeleteMapping("/{reviewId}")
    @ApiOperation(value = "댓글 삭제", notes = "댓글을 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공")
    })
    public ResponseEntity<BaseResponseBody> deleteByReviewId(@RequestBody @ApiParam(value = "삭제할 댓글 ID", required = true) int reviewId) {

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", reviewService.deleteByReviewId(reviewId)));
    }
}
