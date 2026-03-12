export default interface ProviderCrypto{
    crypto(password: string): Promise<string>
    compare(password: string, passwordCrypto: string): Promise<boolean>
}