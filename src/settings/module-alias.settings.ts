import { resolve } from 'path'
import { PROJECT_PATH } from '../constants/global.constants'

export const Aliases = {
    '@/src': resolve(PROJECT_PATH),
    '@/settings': resolve(PROJECT_PATH, 'settings'),
    '@/constants': resolve(PROJECT_PATH, 'constants'),
    '@/loaders': resolve(PROJECT_PATH, 'loaders'),
    '@/app': resolve(PROJECT_PATH, 'app'),
    '@/controllers': resolve(PROJECT_PATH, 'app', 'controllers'),
    '@/routers': resolve(PROJECT_PATH, 'app', 'routers'),
    '@/helpers': resolve(PROJECT_PATH, 'app', 'helpers'),
    '@/errors': resolve(PROJECT_PATH, 'app', 'errors'),
    '@/abstracts': resolve(PROJECT_PATH, 'app', 'abstracts')
}