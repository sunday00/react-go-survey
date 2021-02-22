# TODO

1. show result
1. toggle result mode :

   - 대답하면 중간 결과 바로
   - 대답하면 일단 결과 숨기고 나중에 결과 확인
   - 결과를 완전 비공개 : 출제자만 나중에 myinfo에서 화인

1. 목록 (index)

   - 각종 필터링

1. 중복 답변 필터링

mysql
set global log_bin_trust_function_creators=1;
mysql -u [go db user] -p go_react_survey < ./mysqlFunctionMake.sql
