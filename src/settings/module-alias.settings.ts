import { resolve } from 'path'
import { PROJECT_PATH } from '../constants/global.constants'

export const AliasSettings = {
    '@/src': resolve(PROJECT_PATH),
    '@/settings': resolve(PROJECT_PATH, 'settings'),
    '@/constants': resolve(PROJECT_PATH, 'constants'),
    '@/loaders': resolve(PROJECT_PATH, 'loaders'),
    '@/app': resolve(PROJECT_PATH, 'app'),
    '@/controllers': resolve(PROJECT_PATH, 'app', 'controllers'),
    '@/helpers': resolve(PROJECT_PATH, 'app', 'helpers'),
    '@/errors': resolve(PROJECT_PATH, 'app', 'errors'),
    '@/abstracts': resolve(PROJECT_PATH, 'app', 'abstracts')
}