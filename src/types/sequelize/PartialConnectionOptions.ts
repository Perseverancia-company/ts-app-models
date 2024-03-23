
export default interface PartialConnectionOptions {
    pool: {
        max: number,
        acquire: number,
        // Five seconds of idling
        idle: number,
    }
}
