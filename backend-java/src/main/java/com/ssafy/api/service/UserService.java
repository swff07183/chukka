package com.ssafy.api.service;

import com.ssafy.api.request.user.UserModifyReq;
import com.ssafy.api.request.user.UserRegisterPostReq;

import com.ssafy.api.response.admin.UserRes;
import com.ssafy.db.entity.User;

import com.ssafy.api.response.user.UserMyLectureRes;
import com.ssafy.common.util.MailUtil;
import com.ssafy.db.entity.Pay;
import com.ssafy.db.entity.Snacks;
import org.springframework.data.domain.Pageable;

import java.util.List;


/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	User createUser(UserRegisterPostReq userRegisterInfo);
	User getUserByUserId(String userId);
	User getUserByUserNickname(String userNickname);
	int updateUserRefreshToken(String userId, String userAccessToken);
	User updateUser(String userId, UserModifyReq modifyInfo);
	int updatePw(String userId, String userPw);
	void sendPw(MailUtil mail);
	List<UserMyLectureRes> getLecturesByUserId(String userId);
	List<Snacks> getSnacksByUserId(String UserId);
	List<Pay> getPaysByUserId(String userId);
	User getUserByRefreshToken(String refreshToken);
	int logout(String userId);
	List<UserRes> getUsers();
	List<UserRes> getCertainUsers(String category, String keyword);
	boolean quit(String userId);
	void createInstructor(String userId);

}
