package com.ssafy.api.service;

import java.util.List;


public interface EnrollService {
    /*  수강 강의 추가  */
    void createEnroll(String userId, List<Integer> lecIds);
    /* 수강 조회 */
    boolean findByLecIdAnsUserId(int ledId, String userId);

}
