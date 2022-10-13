import { Box, Paper, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { ComponentProps, FC, memo } from 'react'
import { TagChip } from '../TagChip'

type Props = {
  emoji?: string
  title: string
  tags: { name: string; color: ComponentProps<typeof TagChip>['colorKey'] }[]
  createdAt: string
}

export const PostCard: FC<Props> = memo(function PostCard({
  emoji = '🌵',
  title,
  tags,
  createdAt,
}) {
  return (
    <Paper sx={{ p: 8, py: 4, pl: 2, width: 344, borderRadius: 2 }} elevation={4}>
      <Grid container alignItems="center" justifyContent="center" spacing={2}>
        <Grid xs={3} sx={{ textAlign: 'center' }}>
          <Typography variant="h4">{emoji}</Typography>
        </Grid>
        <Grid xs={9}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
          <Grid container sx={{ mt: 2, ml: -5 }}>
            {tags.map((tag) => (
              <Grid key={tag.name}>
                <TagChip variant="filled" label={tag.name} colorKey={tag.color} />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 2, textAlign: 'end' }}>
            <Typography variant="caption">{createdAt}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
})
