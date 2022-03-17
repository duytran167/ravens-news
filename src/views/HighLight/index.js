import React from 'react'
import { Grid } from '@material-ui/core'
import HighLightCard from './HighLightCard'

export default function HighLight({ summary }) {
  return (
    <Grid container spacing={3}>
      {summary.map((data) => (
        <Grid item sm={4} xs={12}>
          <HighLightCard
            title={data.title}
            count={data.count}
            type={data.type}
          />
        </Grid>
      ))}
    </Grid>
  )
}