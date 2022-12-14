package com.ssafy.api.service;

import com.ssafy.api.request.section.SectionPostReq;
import com.ssafy.api.request.section.SectionUpdateReq;
import com.ssafy.api.response.section.SectionGetRes;
import com.ssafy.db.entity.Instructor;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.entity.Section;
import com.ssafy.db.repository.InstructorRepository;
import com.ssafy.db.repository.LectureRepository;
import com.ssafy.db.repository.SectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service("SectionService")
public class SectionServiceImpl implements SectionService{

    @Autowired
    SectionRepository sectionRepository;
    @Autowired
    LectureRepository lectureRepository;
    @Autowired
    InstructorRepository instructorRepository;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    @Value("${cloud.aws.region.static}")
    private String region;

    // μΉμ μμ±
    @Override
    public Section createSection(SectionPostReq sectionPostReq, boolean isFile) {
        Optional<Lecture> lec = lectureRepository.findById(sectionPostReq.getLecId());
        Optional<Instructor> ins = instructorRepository.findById(sectionPostReq.getInsId());
        if(!lec.isPresent() || !ins.isPresent()) {
            return null;
        }
        Section section = Section.builder()
                    .lecture(lec.get())
                    .instructor(ins.get())
                    .secTitle(sectionPostReq.getSecTitle())
                    .secContents(sectionPostReq.getSecContents())
                    .build();
        Section sec = sectionRepository.save(section);
        if(isFile) {
            Section sectionn = Section.builder()
                    .secId(sec.getSecId())
                    .lecture(sec.getLecture())
                    .instructor(sec.getInstructor())
                    .secTitle(sec.getSecTitle())
                    .secContents(sec.getSecContents())
                    .secVideoUrl("https://" + bucket + ".s3." + region + ".amazonaws.com/vid/section/contents/" + sec.getSecId())
                    .build();
            return sectionRepository.save(sectionn);
        }
        return sectionRepository.save(sec);
    }

    // κ°μ μμ΄λλ‘ μΉμ λͺ©λ‘ μ‘°ν
    @Override
    public Page<SectionGetRes> getSectionByLecId(int lecId, Pageable pageable) {
        PageRequest pageRequest = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("secId"));
        Lecture lecture = lectureRepository.findLectureByLecId(lecId);
        Page<Section> page = sectionRepository.findAllByLecture(lecture, pageRequest);
        Page<SectionGetRes> dtoPage = page
                .map(m -> SectionGetRes.of(
                        m.getSecId(),
                        m.getSecTitle(),
                        m.getSecContents(),
                        m.getSecVideoUrl()
                ));
        return dtoPage;
    }

    @Override
    public Page<SectionGetRes> getAllSections(Pageable pageable) {
        PageRequest pageRequest = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("secId"));
        Page<Section> page = sectionRepository.findAll(pageRequest);
        Page<SectionGetRes> dtoPage = page
                .map(m -> SectionGetRes.of(
                        m.getSecId(),
                        m.getSecTitle(),
                        m.getSecContents(),
                        m.getSecVideoUrl()
                ));
        return dtoPage;
    }

    // μΉμ μμ  (ν΄λΉ κ°μ μμ΄λ, κ°μ¬ μμ΄λ, μΉμ μμ΄λκ° μμ λ null λ°ν κ·Έ μΈ μμ λ μΉμ κ°μ²΄ λ°ν)
    @Override
    public Section updateSection(int lecId, SectionUpdateReq sectionInfo) {
        Optional<Lecture> lec = lectureRepository.findById(lecId);
        Optional<Instructor> ins = instructorRepository.findById(sectionInfo.getInsId());
        if(!lec.isPresent() || !ins.isPresent()) {
            return null;
        }
        if(sectionRepository.findById(sectionInfo.getSecId()).isPresent()) {
            Section section = Section.builder()
                    .secId(sectionInfo.getSecId())
                    .lecture(lec.get())
                    .instructor(ins.get())
                    .secTitle(sectionInfo.getSecTitle())
                    .secContents(sectionInfo.getSecContents())
                    .secVideoUrl("https://" + bucket + ".s3." + region + ".amazonaws.com/vid/section/contents/" + sectionInfo.getSecId())
                    .build();
            return sectionRepository.save(section);
        }
        return null;
    }

    @Override
    public boolean deleteBySecId(int secId) {
        if(sectionRepository.findById(secId).isPresent()) {
            sectionRepository.delete(Section.builder().secId(secId).build());
            return true;
        }
        return false;
    }
}
