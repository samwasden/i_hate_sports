import React, {useState} from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={'white'}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={'white'} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={'white'} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="white">{`${payload.name}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function PieChartComponent({data, innerRadius, outerRadius, activeIndex, setactiveIndex}) {

  const colors = {
    'Positive': '#5EDA8D',
    'Negative': '#FF8042',
    'Neutral': '#EED676',
    'Win': '#5EDA8D',
    'Lose': '#FF8042',
    'Draw': '#EED676',
    'No Event': '#ffffff27'
  }


  const onPieEnter = (_, index) => {
    setactiveIndex(index);
  };

    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            fill='fill'
            dataKey="value"
            onMouseEnter={onPieEnter}
          >
              {data.map((entry, index) => {
                  return <Cell key={`cell-${index}`} fill={colors[data[index].name]} />
                })}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
