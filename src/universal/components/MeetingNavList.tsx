import styled from 'react-emotion'

const MeetingNavList = styled('ul')({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  listStyle: 'none',
  margin: 0,
  minHeight: 0, // very important! allows children to collapse for overflow
  padding: 0
})

export default MeetingNavList
