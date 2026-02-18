/**
 * Wrapper cryptographique utilisant la Web Crypto API native.
 * Remplace libsodium-wrappers — aucune dépendance externe requise.
 */

class SodiumWrapper {
  constructor() {
    this.ready = false;
  }

  async init() {
    if (this.ready) return;
    // Web Crypto API est synchrone et toujours disponible dans les navigateurs modernes
    if (!window.crypto || !window.crypto.subtle) {
      throw new Error('Web Crypto API non disponible dans ce navigateur');
    }
    this.ready = true;
  }

  ensureReady() {
    if (!this.ready) throw new Error('SodiumWrapper non initialisé — appelez init() d\'abord');
  }

  // ─── Génération de clés ───────────────────────────────────────────────────

  async generateKeyPair() {
    this.ensureReady();
    const keyPair = await window.crypto.subtle.generateKey(
      { name: 'RSA-OAEP', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' },
      true,
      ['encrypt', 'decrypt']
    );
    const publicKeyJWK = await window.crypto.subtle.exportKey('jwk', keyPair.publicKey);
    const privateKeyJWK = await window.crypto.subtle.exportKey('jwk', keyPair.privateKey);
    return { publicKey: keyPair.publicKey, privateKey: keyPair.privateKey, publicKeyJWK, privateKeyJWK };
  }

  async generateSymmetricKey() {
    this.ensureReady();
    return await window.crypto.subtle.generateKey(
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    );
  }

  // ─── Chiffrement asymétrique RSA-OAEP ────────────────────────────────────

  async encryptAsymmetric(publicKeyJWK, data) {
    this.ensureReady();
    const publicKey = await window.crypto.subtle.importKey(
      'jwk', publicKeyJWK,
      { name: 'RSA-OAEP', hash: 'SHA-256' },
      false, ['encrypt']
    );
    const encoded = typeof data === 'string' ? new TextEncoder().encode(data) : data;
    const encrypted = await window.crypto.subtle.encrypt({ name: 'RSA-OAEP' }, publicKey, encoded);
    return this._bufferToBase64(encrypted);
  }

  async decryptAsymmetric(privateKey, encryptedBase64) {
    this.ensureReady();
    const encrypted = this._base64ToBuffer(encryptedBase64);
    const decrypted = await window.crypto.subtle.decrypt({ name: 'RSA-OAEP' }, privateKey, encrypted);
    return new TextDecoder().decode(decrypted);
  }

  // ─── Chiffrement symétrique AES-GCM ──────────────────────────────────────

  async encrypt(key, plaintext) {
    this.ensureReady();
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encoded = typeof plaintext === 'string' ? new TextEncoder().encode(plaintext) : plaintext;
    const ciphertext = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv, tagLength: 128 },
      key, encoded
    );
    return {
      ciphertext: this._bufferToBase64(ciphertext),
      iv: this._bufferToBase64(iv)
    };
  }

  async decrypt(key, encryptedData) {
    this.ensureReady();
    const ciphertext = this._base64ToBuffer(encryptedData.ciphertext);
    const iv = this._base64ToBuffer(encryptedData.iv);
    const decrypted = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv, tagLength: 128 },
      key, ciphertext
    );
    return new TextDecoder().decode(decrypted);
  }

  // ─── HKDF — dérivation de clé ────────────────────────────────────────────

  async deriveKey(inputKeyMaterial, salt, info, length = 256) {
    this.ensureReady();
    const ikm = typeof inputKeyMaterial === 'string'
      ? new TextEncoder().encode(inputKeyMaterial)
      : inputKeyMaterial;

    const baseKey = await window.crypto.subtle.importKey(
      'raw', ikm, { name: 'HKDF' }, false, ['deriveKey']
    );

    return await window.crypto.subtle.deriveKey(
      {
        name: 'HKDF',
        hash: 'SHA-256',
        salt: salt || new Uint8Array(32),
        info: typeof info === 'string' ? new TextEncoder().encode(info) : (info || new Uint8Array(0))
      },
      baseKey,
      { name: 'AES-GCM', length },
      true,
      ['encrypt', 'decrypt']
    );
  }

  // ─── HMAC — signature d'intégrité ────────────────────────────────────────

  async sign(key, data) {
    this.ensureReady();
    const encoded = typeof data === 'string' ? new TextEncoder().encode(data) : data;
    const rawKey = key instanceof CryptoKey
      ? await window.crypto.subtle.exportKey('raw', key)
      : key;

    const hmacKey = await window.crypto.subtle.importKey(
      'raw', rawKey, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
    );
    const signature = await window.crypto.subtle.sign('HMAC', hmacKey, encoded);
    return this._bufferToBase64(signature);
  }

  async verify(key, data, signatureBase64) {
    this.ensureReady();
    const encoded = typeof data === 'string' ? new TextEncoder().encode(data) : data;
    const signature = this._base64ToBuffer(signatureBase64);
    const rawKey = key instanceof CryptoKey
      ? await window.crypto.subtle.exportKey('raw', key)
      : key;

    const hmacKey = await window.crypto.subtle.importKey(
      'raw', rawKey, { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']
    );
    return await window.crypto.subtle.verify('HMAC', hmacKey, signature, encoded);
  }

  // ─── Utilitaires ─────────────────────────────────────────────────────────

  randomBytes(length) {
    return window.crypto.getRandomValues(new Uint8Array(length));
  }

  _bufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  }

  _base64ToBuffer(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes.buffer;
  }

  bufferToBase64(buffer) { return this._bufferToBase64(buffer); }
  base64ToBuffer(base64) { return this._base64ToBuffer(base64); }
}

const sodiumWrapper = new SodiumWrapper();
export default sodiumWrapper;