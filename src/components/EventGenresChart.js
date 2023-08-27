import React, { useState, useEffect, PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const EventGenresChart = ({ events }) => {
    const [data, setData] = useState([]);

    //update the data which will be used in our pie chart based any change in the events
    useEffect(() => {
        setData(getData());
    }, [`${events}`]);

    //store the list of summaries in an array
    const genres = ["React", "JavaScript", "Node", "jQuery", "Angular"];

    //function to find out how many events there are for each genre
    const getData = () => {
        //loop over the genres array
        const data = genres.map((genre) => {
            //for each iteration, filter and get the events that have a summary matching each genre
            const filteredEvents = events.filter((event) =>
                event.summary.includes(genre)
            );
            //return an object with the name and value keys
            return {
                name: genre,
                value: filteredEvents.length,
            };
        });
        return data;
    };

    //color pallette for
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#ec4976"];

    //create a customised label which will render the the summary and percentage of each genre type e.g "React 50%"
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        outerRadius,
        percent,
        index,
    }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius;
        const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
        const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
        return percent ? (
            <text
                x={x}
                y={y}
                fill="#8884d8"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
            >
                {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
            </text>
        ) : null;
    };

    //render a pie chart based on the data in the 'data' array
    return (
        <ResponsiveContainer width="99%" height={400}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    fill="#8884d8"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={150}
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default EventGenresChart;
