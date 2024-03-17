import MSQLDC_FetchENV from "./MSQLDC_FetchENV";

/**
 * Alias for MSQLDC_FetchENV, which is pretty confusing
 */
export default function mysqlConn() {
    return MSQLDC_FetchENV();
}
