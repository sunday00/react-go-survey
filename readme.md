# TODO

1. 누구나 참여할 수 있는 설문 메인에 띄우기
1. 연령별 참여 대상

1. toggle result mode :

   - 대답하면 중간 결과 바로
   - 대답하면 일단 결과 숨기고 나중에 결과 확인
   - 결과를 완전 비공개 : 출제자만 나중에 myinfo에서 화인

1. 중복 참여 블락

1. 결과 엑셀

1. 그림 삽입

   - 메인이미지 삽입 및 메인에 예쁘게
   - 그림 문항 (ex: 어떤 그림이 더 예쁘나요? 1, 2)

1. 시간 지나 로그아웃 이후 목록 클릭 시 튕겨주기

1. 검색

   - 검색입력form
   - 태그 등 누르면 필터링

1. user info와 무관하게 걍 추천 설문

1. 개인정보 수정

1. 설문 지우기 (my info)

mysql
set global log_bin_trust_function_creators=1;
mysql -u [go db user] -p go_react_survey < ./mysqlFunctionMake.sql
