import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import Typography from '@material-ui/core/Typography';

const ResultChoice = ({ r, classes }) => {
  const data = (r) => {
    const arr = r.Answers.map((a) => {
      return {
        id: a.Val,
        label: a.Val,
        value: a.Cnt,
      };
    });
    return arr;
  };

  return (
    <div>
      <hr style={{ margin: '1.5rem' }} />
      <Typography component="h1" variant="h4" className={classes.title}>
        {r.Title}
      </Typography>
      <section style={{ height: '350px' }} className="pie">
        <ResponsivePie
          className="chart"
          data={data(r)}
          fit={false}
          margin={{ top: 20, right: 80, bottom: 50, left: 80 }}
          innerRadius={0.05}
          colors={{ scheme: 'pastel1' }}
          borderWidth={1}
          borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          radialLabelsSkipAngle={10}
          radialLabelsTextColor="#fff"
          radialLabelsLinkColor={{ from: 'color' }}
          sliceLabelsSkipAngle={10}
          sliceLabelsTextColor="#333"
          legends={[
            {
              anchor: 'bottom-left',
              direction: 'column',
              justify: false,
              translateX: -50,
              translateY: 30,
              itemsSpacing: 10,
              itemWidth: 300,
              itemHeight: 18,
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: 'circle',
              itemTextColor: '#fff',
              textColor: '#fff',
            },
          ]}
        />
      </section>
    </div>
  );
};

export default ResultChoice;
