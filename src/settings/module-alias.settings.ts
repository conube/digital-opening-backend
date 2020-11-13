import { resolve } from 'path'
import { PROJECT_PATH } from '../constants/global.constants'

export const AliasSettings = {
    '@/src': resolve(PROJECT_PATH),
    '@/controllers': resolve(PROJECT_PATH, 'controllers'),
    '@/settings': resolve(PROJECT_PATH, 'settings'),
    '@/loaders': resolve(PROJECT_PATH, 'loaders'),
    '@/constants': resolve(PROJECT_PATH, 'constants'),
    '@/helpers': resolve(PROJECT_PATH, 'helpers'),
}