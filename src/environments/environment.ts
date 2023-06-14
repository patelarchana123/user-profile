// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {

  production: false,
// 1Authority Configuration
client_id: 'DeskBook',
// openid profile - UserProfile
scope: 'openid profile UserProfile 1AuthorityApi 1RPPPolicyServerApi DeskBookApi',
response_type: 'id_token token',
authority: 'https://1authority-interns.1rivet.com:5004/',
redirect_uri: 'http://localhost:4200/',
secret: 'secret1',
grant_type: 'implicit',
// Policy server config
policy_url: 'http://103.249.120.58:8503/api/userPolicy/',
policy_name: 'PMCPolicy',
apiUrl: 'https://feb-deskbook-admin-service-dev.1rivet.com:9500/api',
authority_register_uri: 'https://feb-deskbook-admin-service-dev.1rivet.com:9500/api',
acr_values: 'tenant:92E838C3-EC40-486F-B126-BBEC78E7D99B',
userprofile_uri :"https://dev-deskbook-userapi.1rivet.com:9443/api/deskbook/",
java_url: " https://dev-deskbook-userapi.1rivet.com:9504/"
};
  


//  scopes are used by an application during authentication to authorize access to a user's details, like name and picture.
