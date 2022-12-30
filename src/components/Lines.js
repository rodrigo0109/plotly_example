import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js'

const Lines = () => {

    const [data, setData] = useState({ data: [] })

    useEffect(() => {
        fetch('https://data.cityofnewyork.us/resource/rc75-m7u3.json')
            .then(res => res.json())
            .then(data => setData({ data: data }))
    }, [])

    const addTraces = ({data}) => {
        let traces = []
        let dates = []
        let lines = {
            'Case_Count': {'y': []},
            'Death_Count': {'y': []},
            'Hospitalized_Count': {'y': []}
        }
        //console.log(data)
        data.map(each => {
            dates.push(each.date_of_interest)

            lines.Case_Count.y.push(each.case_count)
            lines.Death_Count.y.push(each.death_count)
            lines.Hospitalized_Count.y.push(each.hospitalized_count)
        })

        console.log(lines)

        for (const [key, value] of Object.entries(lines)) {
            traces.push({
                type: 'scatter',
                mode: 'lines',
                x: dates,
                y: value.y,
                name: key
            })

        }
        console.log(traces)
        return traces
    }
    //console.log(data)
    return (
        <div>
            <Plot 
                data = {addTraces(data)}
                layout={{
                    width: 1000,
                    height: 500,
                    title: 'test'
                }}
            />
        </div>
    )
}

export default Lines