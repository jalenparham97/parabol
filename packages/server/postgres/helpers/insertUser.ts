import getPg from '../getPg'
import User from '../../database/types/User'
import z from '../getZapatos'
import type * as s from 'zapatos/schema'

const insertUser = async (users: User[]): Promise<s.User.Selectable[]> => {
  const pg = getPg()
  const result = await z.insert('User', users).run(pg)
  const mappedArr = result.map(row => {
    const mapped = Object.assign({}, row, {createdAt: undefined, updatedAt: undefined}) as s.User.Selectable
    mapped['createdAt'] = new Date(row.createdAt)
    mapped['updatedAt'] = new Date(row.updatedAt)
    return mapped
  })
  console.log('users:', users)
  console.log('result:', mappedArr)
  return mappedArr
}

export default insertUser
