import React from 'react'
import {CanvasJSChart} from 'canvasjs-react-charts'


export const PieColumnChart = ({options}) => {


    return (
        <div>
            <CanvasJSChart options = {options}
                 /* onRef={ref => this.chart = ref} */
            />
            {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
        </div>
    )
}
