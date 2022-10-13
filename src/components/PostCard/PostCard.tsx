import { css } from '@emotion/react'
import { Box, Chip, Paper, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { FC, memo } from 'react'

type Props = {
  emoji?: string
  title: string
  tags: string[]
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
            {tags.map((tag, index) => (
              <Grid key={tag}>
                <Chip
                  label={tag}
                  size="small"
                  color={index % 2 === 0 ? 'primary' : 'secondary'}
                  css={css`
                    .MuiChip-label {
                      color: white;
                    }
                  `}
                />
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
