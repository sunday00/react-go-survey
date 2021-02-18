import React from 'react';
import Typography from '@material-ui/core/Typography';

const ResultEssay = ({ r, classes }) => {
  return (
    <div>
      <hr style={{ margin: '1rem' }} />
      <Typography component="h1" variant="h4" className={classes.title}>
        {r.Title}
      </Typography>
      <section className="articles">
        <ul>
          {r.Answers.map((a, i) => (
            <li key={i}>{a.Answer}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ResultEssay;
