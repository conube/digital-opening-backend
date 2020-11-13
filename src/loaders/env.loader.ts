import dotenv from 'dotenv'
import { resolve } from 'path'
import { EnviromentSettings } from "@/settings/env.settings"
import { ENVIROMENT_PATH } from '@/constants/global.constants'

const enviroment = process.env.ENV as 'DEVELOPMENT' | 'PRODUCTION'
const enviromentFile = EnviromentSettings[enviroment]
dotenv.config({ path: resolve(ENVIROMENT_PATH, enviromentFile) })