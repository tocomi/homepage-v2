import { css } from '@emotion/react'
import { Box, Chip, Paper, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { FC, memo } from 'react'

type Props = {
  emoji?: string
  title: string
  tags: string[]
  createdBy: string
}

export const PostCard: FC<Props> = memo(function PostCard({
  emoji = '🌵',
  title,
  tags,
  createdBy,
}) {
  return (
    <Paper sx={{ p: 8, pl: 2, width: 352, borderRadius: 2 }} elevation={4}>
      <Grid container alignItems="center" justifyContent="center" spacing={2}>
        <Grid xs={3} sx={{ textAlign: 'center' }}>
          <Typography variant="h4">{emoji}</Typography>
        </Grid>
        <Grid xs={9}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
          <Box sx={{ mt: 4 }}>
            {tags.map((tag, index) => (
              <Chip
                label={tag}
                key={tag}
                size="small"
                sx={{ mr: 2 }}
                color={index % 2 === 0 ? 'primary' : 'secondary'}
                css={css`
                  .MuiChip-label {
                    margin-bottom: 2px;
                    color: white;
                  }
                `}
              />
            ))}
          </Box>
          <Box sx={{ mt: 2, textAlign: 'end' }}>
            <Typography variant="caption">{createdBy}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
})
