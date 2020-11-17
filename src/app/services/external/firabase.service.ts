import {
  app,
  credential,
  ServiceAccount,
  initializeApp,
  auth
} from 'firebase-admin'

export class FirebaseAdminService {
  constructor(
    private firebaseAdmin: app.App
  ) { }

  public async verifyToken(tokenId: string): Promise<auth.DecodedIdToken> {
    const decoded = await this
      .firebaseAdmin
      .auth()
      .verifyIdToken(tokenId)

    return decoded
  }

  public static _credentials: ServiceAccount = {
    projectId: '',
    clientEmail: '',
    privateKey: ''
  }

  public static _firebaseConnection: app.App

  public static getInstance(): app.App {
    if (this._firebaseConnection) {
      throw new Error('Instance is already running')
    }

    this._firebaseConnection = initializeApp({ credential: credential.cert(this._credentials) })
    return this._firebaseConnection
  }
}

export const firebaseAdmin = new FirebaseAdminService(FirebaseAdminService.getInstance())