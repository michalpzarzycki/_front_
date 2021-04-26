import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig()

export const API = publicRuntimeConfig.PRODUCTION ? 'https://seoblog.com' : 'http://localhost:8000';
export const APP_NAME = publicRuntimeConfig.APP_NAME;

export const DOMAIN = publicRuntimeConfig.PRODUCTION ? 
                      publicRuntimeConfig.DOMAIN_PRODUCTION :
                      publicRuntimeConfig.DOMAIN_DEVELOPMENT

export const DISCUSS_SHORTNAME = publicRuntimeConfig.DISCUSS_SHORTNAME