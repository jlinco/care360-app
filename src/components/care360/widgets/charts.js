import React from 'react'
// import ChartistGraph from 'react-chartist'
// import ChartistTooltip from 'chartist-plugin-tooltips-updated'

// const options = {
//   low: 0,
//   chartPadding: {
//     right: 0,
//     left: 0,
//     top: 5,
//     bottom: 0,
//   },
//   fullWidth: true,
//   showPoint: true,
//   lineSmooth: false,
//   axisY: {
//     showGrid: false,
//     showLabel: false,
//     offset: 0,
//   },
//   axisX: {
//     showGrid: false,
//     showLabel: false,
//     offset: 0,
//   },
//   showArea: true,
//   plugins: [
//     ChartistTooltip({
//       anchorToPoint: false,
//       appendToBody: true,
//       seriesName: false,
//     }),
//   ],
// }

const Charts = props => {
  const { organizationData, chartCopy } = props
  console.log(organizationData)
  console.log(chartCopy)
  const totalPatients = organizationData
    .map(item => {
      return item.patients ? Object.keys(item.patients).length : 0
    })
    .reduce((previous, current) => {
      return previous + current
    }, 0)
  return (
    <div className="position-relative">
      <div className="card-body">
        <div className="text-dark font-size-18 font-weight-bold mb-1">{chartCopy.title}</div>
        <div className="text-gray-6 mb-2">{chartCopy.subTitle}</div>
        <div className="font-weight-bold font-size-36 text-dark">{totalPatients}</div>
      </div>
      {/* <ChartistGraph
        className="height-200 ct-hidden-points"
        data={data}
        options={options}
        type="Line"
      /> */}
    </div>
  )
}

export default Charts
