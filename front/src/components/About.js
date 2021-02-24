import React from 'react';

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import { useSurveyStyle } from '../lib/styles/mainStyle';

const About = () => {
  const classes = useSurveyStyle();
  return (
    <Container component="main" fullwidth={'true'} className={classes.root}>
      <CssBaseline />
      <Typography component="h1" variant="h5" className={classes.title}>
        This is...
      </Typography>
      <article className={classes.article}>
        <p>안녕하세요?</p>
        <p>
          이 사이트는 연습용 사이트로 간단한 설문조사를 작성하고 결과를 확인 할 수 있는
          사이트입니다.
        </p>
        <p>
          외부 회사(구글/카카오)의 식별번호만 저장하므로 이 큰 회사가 털리지 않으면 개인정보를
          유출할 염려는 적으나, 되도록 서브 정보에 너무 자세하거나 솔직한 정보를 입력하지 마세요.
          책임지지 않습니다.
        </p>
        <p>이 사이트는 다음과 같은 기술로 제작되었습니다.</p>
        <p>go, react, react-saga, material-ui, tagify, mysql, nginx-proxy, and ...etc</p>
        <p>그밖에 다음과 같은 오픈소스의 도움을 받았습니다.</p>
        <p>fontawsome, googlefonts</p>
        <p>
          go 언어는 유료가 아닌 tucker님의 무료 유튜브 강좌를 통해 많은 도움을 받았습니다. 감사의
          인사를 전합니다.
        </p>
        <p>
          <a
            href="https://www.youtube.com/channel/UCZp_ftx6UB_32VfVmlS3o_A"
            style={{ textDecoration: 'underline' }}
          >
            tucker programming
          </a>
        </p>
        <p>
          아무래도 toy이다 보니 부족한 기능이 많습니다. 여유가 생길때마다 조금씩 늘려갈 예정입니다.
        </p>
        <p>다시한번 방문을 환영합니다.</p>
      </article>
    </Container>
  );
};

export default About;
