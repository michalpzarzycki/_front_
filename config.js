import getConfig from 'next/config';

const { env } = getConfig()

export const API = env.PRODUCTION ? 'https://seoblog.com' : 'http://localhost:8000';
export const APP_NAME = env.APP_NAME;

export const DOMAIN = env.PRODUCTION ? 
                      env.DOMAIN_PRODUCTION :
                      env.DOMAIN_DEVELOPMENT

export const DISCUSS_SHORTNAME = env.DISCUSS_SHORTNAME