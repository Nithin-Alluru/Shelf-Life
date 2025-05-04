
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PieChart } from 'react-minimal-pie-chart'
import '../assets/css/YearlyProgressChart.css'


function YearlyProgressChart({progress, goal}: {progress:number, goal:number}) {
    let year = new Date().getFullYear();
    return(
        <div className='chart'>
            <span className='key'>
                <p><FontAwesomeIcon icon={faCircle} color='#829584'></FontAwesomeIcon> = Books i've read ({progress})</p>
                <p><FontAwesomeIcon icon={faCircle} color='#6f7588'></FontAwesomeIcon> = My {year} reading goal ({goal})</p>
            </span>
            
            <PieChart
                data={[
                    { title: '%', value: progress, color: '#829584' },
                ]}
                radius={25}
                lengthAngle={-360}
                totalValue={goal}
                background='#6f7588'
                labelPosition={60}
                label={({ dataEntry }) => Math.trunc(dataEntry.value/goal *100) + dataEntry.title } 
                labelStyle={
                    {
                        "fontSize": "5px",
                        "fontFamily": "sans-serif",
                        "color": "#eaeee6"
                      }
                }
              />
        </div>
    );
};

export default YearlyProgressChart;