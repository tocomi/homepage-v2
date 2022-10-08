import { Card, Chip, Typography } from '@mui/material'
import Grid from '@mui/system/Unstable_Grid'
import type { NextPage } from 'next'
import { Paper } from '@/components/Paper'

const Home: NextPage = () => {
  return (
    <Grid container spacing={12}>
      <Grid xs={12}>
        <Biography />
      </Grid>
      <Grid xs={12}>
        <RecentPosts />
      </Grid>
    </Grid>
  )
}

const Biography = () => {
  return (
    <Paper>
      <Grid container alignItems="center">
        <Grid xs={3} sx={{ textAlign: 'center' }}>
          <Typography variant="h1">🥳</Typography>
        </Grid>
        <Grid xs={9}>
          <Typography variant="h2" sx={{ fontWeight: 700 }}>
            Kenta TSUNEMI
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            @tocomi
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, mt: 4 }}>
            🧑‍💻 Frontend Engineer
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            🏢 Techtouch, Inc.
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

const RecentPosts = () => {
  return (
    <Paper>
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        📝 Recent Posts
      </Typography>
      <Card variant="outlined" sx={{ p: 4, mt: 8 }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid>
            <Typography sx={{ fontWeight: 700 }}>⚾神宮球場行ってきた</Typography>
          </Grid>
          <Grid>
            <Chip label="hobby"></Chip>
          </Grid>
        </Grid>
      </Card>
      <Card variant="outlined" sx={{ p: 4, mt: 4 }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid>
            <Typography sx={{ fontWeight: 700 }}>脱 HHKB してみた</Typography>
          </Grid>
          <Grid>
            <Chip label="Gadget"></Chip>
          </Grid>
        </Grid>
      </Card>
      <Card variant="outlined" sx={{ p: 4, mt: 4 }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid>
            <Typography sx={{ fontWeight: 700 }}>React</Typography>
          </Grid>
          <Grid>
            <Chip label="react"></Chip>
          </Grid>
        </Grid>
      </Card>
    </Paper>
  )
}

export default Home
