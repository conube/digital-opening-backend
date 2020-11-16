import * as dotenv from 'dotenv'
import { resolve } from 'path'
import { Enviroments } from "@/src/settings/enviroment.settings"
import { ENVIROMENT_PATH } from '@/constants/global.constants'

const enviroment = process.env.ENV as 'DEVELOPMENT' | 'PRODUCTION' || 'DEVELOPMENT'
const enviromentFile = Enviroments[enviroment]
dotenv.config({ path: resolve(ENVIROMENT_PATH, enviromentFile) })

