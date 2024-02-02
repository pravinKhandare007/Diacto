import React, { useEffect, useRef } from 'react';
import '../../Styles/PublishCourseDetails.css'
import * as echarts from 'echarts';

const PublishCourseDetails = () => {

  const chartRef = useRef(null);

  useEffect(() => {
    // Create an ECharts instance
    const chart = echarts.init(chartRef.current);

    // Define the chart options
    const options = {
      title: {
      },
      series: [
        {
          name: 'Data',
          type: 'pie',
          radius: ['40%', '70%'],
          data: [
            { value: 100, name: 'Total Marks' },
            { value: 65, name: 'Average Marks' },
            { value: 92, name: 'Highest Marks' },
            { value: 9, name: 'Lowest Marks' },
            // Add more data as needed
          ],
        },
      ],
    };

    // Set the options to the chart
    chart.setOption(options);

    // Clean up the chart instance when the component is unmounted
    return () => {
      chart.dispose();
    };
  }, []); // Run this effect only once on mount




  return (
    <section className='publish__course-details section__padding'>
      <div className="publish__course-details-cards">

        <div className="publish__course-general-info content__card-full-length ">
          <div className="content__card-one">
            <table className='publish__course-general-info__table'>
              <tbody>
                <tr className='publish__course-table-row'>
                  <th className='bold-text general-info__heading'>Subject</th>
                  <td className='p-text__gray general-info__text'>Biology</td>
                </tr>
                <tr className='publish__course-table-row'>
                  <th className='bold-text general-info__heading'>Course Name</th>
                  <td className='p-text__gray general-info__text'>Introdution to Biology</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="content__card-two">
            <table className='publish__course-general-info__table'>
              <tbody>
                <tr className='publish__course-table-row'>
                  <th className='bold-text general-info__heading'>Total Chapters</th>
                  <td className='p-text__gray general-info__text'>15</td>
                </tr>
                <tr className='publish__course-table-row'>
                  <th className='bold-text general-info__heading'>Students Enrolled</th>
                  <td className='p-text__gray general-info__text'>150</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="content__card-three">
            <table className='publish__course-general-info__table'>
              <tbody>
                <tr className='publish__course-table-row'>
                  <th className='bold-text general-info__heading'>Total Marks</th>
                  <td className='p-text__gray general-info__text'>100</td>
                </tr>
                <tr className='publish__course-table-row'>
                  <th className='bold-text general-info__heading'>Average Marks</th>
                  <td className='p-text__gray general-info__text'>65</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="content__card-four">
            <table className='publish__course-general-info__table'>
              <tbody>
                <tr className='publish__course-table-row'>
                  <th className='bold-text general-info__heading'>Completion Rate</th>
                  <td className='p-text__gray general-info__text'>85%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>


        <div className="publish__course-detailed-info content__card-full-length">
          <div className="content__card-heading">Chapter - 1</div>
          {/* <hr/> */}

          <div className="publish__course-detailed-info__cards">

            <div className="publish__course-detailed-content__card-one">
              <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
            </div>


            <div className="publish__course-detailed-content__card-two">
              <table className='publish__course-detailed-info__table'>
                <tbody>
                  <tr className='publish__course-table-row'>
                    <th className='bold-text detailed-info__heading'>Total Marks</th>
                    <td className='p-text__gray detailed-info__text'>100</td>
                  </tr>
                  <tr className='publish__course-table-row'>
                    <th className='bold-text detailed-info__heading'>Average Marks</th>
                    <td className='p-text__gray detailed-info__text'>65</td>
                  </tr>
                  <tr className='publish__course-table-row'>
                    <th className='bold-text detailed-info__heading'>Highest Marks</th>
                    <td className='p-text__gray detailed-info__text'>92</td>
                  </tr>
                  <tr className='publish__course-table-row'>
                    <th className='bold-text detailed-info__heading'>Lowest Marks</th>
                    <td className='p-text__gray detailed-info__text'>09</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default PublishCourseDetails
