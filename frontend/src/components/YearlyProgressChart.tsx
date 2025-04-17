import { Chart, ChartComponent } from "chart.js/auto";
import { useEffect, useRef } from "react";


function YearlyProgressChart({props}:{props:number[]}) {
    const chartRef = useRef(null);
    const chartInstance = useRef<Chart>(null);
    let year = new Date().getFullYear();

    useEffect(() => {
        if(chartInstance.current) {chartInstance.current.destroy() }
        const myChartRef = chartRef.current.getContext('2d');

        chartInstance.current = new Chart(myChartRef, {
            type:"pie", 
            data: {
                labels:[`Books read: ${props[0]}`, `${year} goal: ${props[1]}`], 
                datasets: [{
             
                    data: props,
                    backgroundColor: [
                        '#829584',
                        '#6f7588'
                    ],
                    hoverOffset: 4
                }]}
            
        })
        return(() => {
            if(chartInstance.current) {
                chartInstance.current.destroy()
            }
        })
    }, [])
    

    return(
        <div>
            <canvas ref={chartRef} style={{width:'15vh', height:'15vh'}}/>
        </div>

    );

}


export default YearlyProgressChart;