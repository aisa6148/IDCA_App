"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoErrorCode = void 0;
var MongoErrorCode;
(function (MongoErrorCode) {
    MongoErrorCode[MongoErrorCode["OK"] = 0] = "OK";
    MongoErrorCode[MongoErrorCode["INTERNAL_ERROR"] = 1] = "INTERNAL_ERROR";
    MongoErrorCode[MongoErrorCode["BAD_VALUE"] = 2] = "BAD_VALUE";
    MongoErrorCode[MongoErrorCode["OBSOLETE_DUPLICATE_KEY"] = 3] = "OBSOLETE_DUPLICATE_KEY";
    MongoErrorCode[MongoErrorCode["NO_SUCH_KEY"] = 4] = "NO_SUCH_KEY";
    MongoErrorCode[MongoErrorCode["GRAPH_CONTAINS_CYCLE"] = 5] = "GRAPH_CONTAINS_CYCLE";
    MongoErrorCode[MongoErrorCode["HOST_UNREACHABLE"] = 6] = "HOST_UNREACHABLE";
    MongoErrorCode[MongoErrorCode["HOST_NOT_FOUND"] = 7] = "HOST_NOT_FOUND";
    MongoErrorCode[MongoErrorCode["UNKNOWN_ERROR"] = 8] = "UNKNOWN_ERROR";
    MongoErrorCode[MongoErrorCode["FAILED_TO_PARSE"] = 9] = "FAILED_TO_PARSE";
    MongoErrorCode[MongoErrorCode["CANNOT_MUTATE_OBJECT"] = 10] = "CANNOT_MUTATE_OBJECT";
    MongoErrorCode[MongoErrorCode["USER_NOT_FOUND"] = 11] = "USER_NOT_FOUND";
    MongoErrorCode[MongoErrorCode["UNSUPPORTED_FORMAT"] = 12] = "UNSUPPORTED_FORMAT";
    MongoErrorCode[MongoErrorCode["UNAUTHORIZED"] = 13] = "UNAUTHORIZED";
    MongoErrorCode[MongoErrorCode["TYPE_MISMATCH"] = 14] = "TYPE_MISMATCH";
    MongoErrorCode[MongoErrorCode["OVERFLOW"] = 15] = "OVERFLOW";
    MongoErrorCode[MongoErrorCode["INVALID_LENGTH"] = 16] = "INVALID_LENGTH";
    MongoErrorCode[MongoErrorCode["PROTOCOL_ERROR"] = 17] = "PROTOCOL_ERROR";
    MongoErrorCode[MongoErrorCode["AUTHENTICATION_FAILED"] = 18] = "AUTHENTICATION_FAILED";
    MongoErrorCode[MongoErrorCode["CANNOT_REUSE_OBJECT"] = 19] = "CANNOT_REUSE_OBJECT";
    MongoErrorCode[MongoErrorCode["ILLEGAL_OPERATION"] = 20] = "ILLEGAL_OPERATION";
    MongoErrorCode[MongoErrorCode["EMPTY_ARRAY_OPERATION"] = 21] = "EMPTY_ARRAY_OPERATION";
    MongoErrorCode[MongoErrorCode["INVALID_B_S_O_N"] = 22] = "INVALID_B_S_O_N";
    MongoErrorCode[MongoErrorCode["ALREADY_INITIALIZED"] = 23] = "ALREADY_INITIALIZED";
    MongoErrorCode[MongoErrorCode["LOCK_TIMEOUT"] = 24] = "LOCK_TIMEOUT";
    MongoErrorCode[MongoErrorCode["REMOTE_VALIDATION_ERROR"] = 25] = "REMOTE_VALIDATION_ERROR";
    MongoErrorCode[MongoErrorCode["NAMESPACE_NOT_FOUND"] = 26] = "NAMESPACE_NOT_FOUND";
    MongoErrorCode[MongoErrorCode["INDEX_NOT_FOUND"] = 27] = "INDEX_NOT_FOUND";
    MongoErrorCode[MongoErrorCode["PATH_NOT_VIABLE"] = 28] = "PATH_NOT_VIABLE";
    MongoErrorCode[MongoErrorCode["NON_EXISTENT_PATH"] = 29] = "NON_EXISTENT_PATH";
    MongoErrorCode[MongoErrorCode["INVALID_PATH"] = 30] = "INVALID_PATH";
    MongoErrorCode[MongoErrorCode["ROLE_NOT_FOUND"] = 31] = "ROLE_NOT_FOUND";
    MongoErrorCode[MongoErrorCode["ROLES_NOT_RELATED"] = 32] = "ROLES_NOT_RELATED";
    MongoErrorCode[MongoErrorCode["PRIVILEGE_NOT_FOUND"] = 33] = "PRIVILEGE_NOT_FOUND";
    MongoErrorCode[MongoErrorCode["CANNOT_BACKFILL_ARRAY"] = 34] = "CANNOT_BACKFILL_ARRAY";
    MongoErrorCode[MongoErrorCode["USER_MODIFICATION_FAILED"] = 35] = "USER_MODIFICATION_FAILED";
    MongoErrorCode[MongoErrorCode["REMOTE_CHANGE_DETECTED"] = 36] = "REMOTE_CHANGE_DETECTED";
    MongoErrorCode[MongoErrorCode["FILE_RENAME_FAILED"] = 37] = "FILE_RENAME_FAILED";
    MongoErrorCode[MongoErrorCode["FILE_NOT_OPEN"] = 38] = "FILE_NOT_OPEN";
    MongoErrorCode[MongoErrorCode["FILE_STREAM_FAILED"] = 39] = "FILE_STREAM_FAILED";
    MongoErrorCode[MongoErrorCode["CONFLICTING_UPDATE_OPERATORS"] = 40] = "CONFLICTING_UPDATE_OPERATORS";
    MongoErrorCode[MongoErrorCode["FILE_ALREADY_OPEN"] = 41] = "FILE_ALREADY_OPEN";
    MongoErrorCode[MongoErrorCode["LOG_WRITE_FAILED"] = 42] = "LOG_WRITE_FAILED";
    MongoErrorCode[MongoErrorCode["CURSOR_NOT_FOUND"] = 43] = "CURSOR_NOT_FOUND";
    MongoErrorCode[MongoErrorCode["USER_DATA_INCONSISTENT"] = 45] = "USER_DATA_INCONSISTENT";
    MongoErrorCode[MongoErrorCode["LOCK_BUSY"] = 46] = "LOCK_BUSY";
    MongoErrorCode[MongoErrorCode["NO_MATCHING_DOCUMENT"] = 47] = "NO_MATCHING_DOCUMENT";
    MongoErrorCode[MongoErrorCode["NAMESPACE_EXISTS"] = 48] = "NAMESPACE_EXISTS";
    MongoErrorCode[MongoErrorCode["INVALID_ROLE_MODIFICATION"] = 49] = "INVALID_ROLE_MODIFICATION";
    MongoErrorCode[MongoErrorCode["MAX_TIME_MS_EXPIRED"] = 50] = "MAX_TIME_MS_EXPIRED";
    MongoErrorCode[MongoErrorCode["MANUAL_INTERVENTION_REQUIRED"] = 51] = "MANUAL_INTERVENTION_REQUIRED";
    MongoErrorCode[MongoErrorCode["DOLLAR_PREFIXED_FIELD_NAME"] = 52] = "DOLLAR_PREFIXED_FIELD_NAME";
    MongoErrorCode[MongoErrorCode["INVALID_ID_FIELD"] = 53] = "INVALID_ID_FIELD";
    MongoErrorCode[MongoErrorCode["NOT_SINGLE_VALUE_FIELD"] = 54] = "NOT_SINGLE_VALUE_FIELD";
    MongoErrorCode[MongoErrorCode["INVALID_D_B_REF"] = 55] = "INVALID_D_B_REF";
    MongoErrorCode[MongoErrorCode["EMPTY_FIELD_NAME"] = 56] = "EMPTY_FIELD_NAME";
    MongoErrorCode[MongoErrorCode["DOTTED_FIELD_NAME"] = 57] = "DOTTED_FIELD_NAME";
    MongoErrorCode[MongoErrorCode["ROLE_MODIFICATION_FAILED"] = 58] = "ROLE_MODIFICATION_FAILED";
    MongoErrorCode[MongoErrorCode["COMMAND_NOT_FOUND"] = 59] = "COMMAND_NOT_FOUND";
    MongoErrorCode[MongoErrorCode["OBSOLETE_DATABASE_NOT_FOUND"] = 60] = "OBSOLETE_DATABASE_NOT_FOUND";
    MongoErrorCode[MongoErrorCode["SHARD_KEY_NOT_FOUND"] = 61] = "SHARD_KEY_NOT_FOUND";
    MongoErrorCode[MongoErrorCode["OPLOG_OPERATION_UNSUPPORTED"] = 62] = "OPLOG_OPERATION_UNSUPPORTED";
    MongoErrorCode[MongoErrorCode["STALE_SHARD_VERSION"] = 63] = "STALE_SHARD_VERSION";
    MongoErrorCode[MongoErrorCode["WRITE_CONCERN_FAILED"] = 64] = "WRITE_CONCERN_FAILED";
    MongoErrorCode[MongoErrorCode["MULTIPLE_ERRORS_OCCURRED"] = 65] = "MULTIPLE_ERRORS_OCCURRED";
    MongoErrorCode[MongoErrorCode["IMMUTABLE_FIELD"] = 66] = "IMMUTABLE_FIELD";
    MongoErrorCode[MongoErrorCode["CANNOT_CREATE_INDEX"] = 67] = "CANNOT_CREATE_INDEX";
    MongoErrorCode[MongoErrorCode["INDEX_ALREADY_EXISTS"] = 68] = "INDEX_ALREADY_EXISTS";
    MongoErrorCode[MongoErrorCode["AUTH_SCHEMA_INCOMPATIBLE"] = 69] = "AUTH_SCHEMA_INCOMPATIBLE";
    MongoErrorCode[MongoErrorCode["SHARD_NOT_FOUND"] = 70] = "SHARD_NOT_FOUND";
    MongoErrorCode[MongoErrorCode["REPLICA_SET_NOT_FOUND"] = 71] = "REPLICA_SET_NOT_FOUND";
    MongoErrorCode[MongoErrorCode["INVALID_OPTIONS"] = 72] = "INVALID_OPTIONS";
    MongoErrorCode[MongoErrorCode["INVALID_NAMESPACE"] = 73] = "INVALID_NAMESPACE";
    MongoErrorCode[MongoErrorCode["NODE_NOT_FOUND"] = 74] = "NODE_NOT_FOUND";
    MongoErrorCode[MongoErrorCode["WRITE_CONCERN_LEGACY_O_K"] = 75] = "WRITE_CONCERN_LEGACY_O_K";
    MongoErrorCode[MongoErrorCode["NO_REPLICATION_ENABLED"] = 76] = "NO_REPLICATION_ENABLED";
    MongoErrorCode[MongoErrorCode["OPERATION_INCOMPLETE"] = 77] = "OPERATION_INCOMPLETE";
    MongoErrorCode[MongoErrorCode["COMMAND_RESULT_SCHEMA_VIOLATION"] = 78] = "COMMAND_RESULT_SCHEMA_VIOLATION";
    MongoErrorCode[MongoErrorCode["UNKNOWN_REPL_WRITE_CONCERN"] = 79] = "UNKNOWN_REPL_WRITE_CONCERN";
    MongoErrorCode[MongoErrorCode["ROLE_DATA_INCONSISTENT"] = 80] = "ROLE_DATA_INCONSISTENT";
    MongoErrorCode[MongoErrorCode["NO_MATCH_PARSE_CONTEXT"] = 81] = "NO_MATCH_PARSE_CONTEXT";
    MongoErrorCode[MongoErrorCode["NO_PROGRESS_MADE"] = 82] = "NO_PROGRESS_MADE";
    MongoErrorCode[MongoErrorCode["REMOTE_RESULTS_UNAVAILABLE"] = 83] = "REMOTE_RESULTS_UNAVAILABLE";
    MongoErrorCode[MongoErrorCode["DUPLICATE_KEY_VALUE"] = 84] = "DUPLICATE_KEY_VALUE";
    MongoErrorCode[MongoErrorCode["INDEX_OPTIONS_CONFLICT"] = 85] = "INDEX_OPTIONS_CONFLICT";
    MongoErrorCode[MongoErrorCode["INDEX_KEY_SPECS_CONFLICT"] = 86] = "INDEX_KEY_SPECS_CONFLICT";
    MongoErrorCode[MongoErrorCode["CANNOT_SPLIT"] = 87] = "CANNOT_SPLIT";
    MongoErrorCode[MongoErrorCode["SPLIT_FAILED_OBSOLETE"] = 88] = "SPLIT_FAILED_OBSOLETE";
    MongoErrorCode[MongoErrorCode["NETWORK_TIMEOUT"] = 89] = "NETWORK_TIMEOUT";
    MongoErrorCode[MongoErrorCode["CALLBACK_CANCELED"] = 90] = "CALLBACK_CANCELED";
    MongoErrorCode[MongoErrorCode["SHUTDOWN_IN_PROGRESS"] = 91] = "SHUTDOWN_IN_PROGRESS";
    MongoErrorCode[MongoErrorCode["SECONDARY_AHEAD_OF_PRIMARY"] = 92] = "SECONDARY_AHEAD_OF_PRIMARY";
    MongoErrorCode[MongoErrorCode["INVALID_REPLICA_SET_CONFIG"] = 93] = "INVALID_REPLICA_SET_CONFIG";
    MongoErrorCode[MongoErrorCode["NOT_YET_INITIALIZED"] = 94] = "NOT_YET_INITIALIZED";
    MongoErrorCode[MongoErrorCode["NOT_SECONDARY"] = 95] = "NOT_SECONDARY";
    MongoErrorCode[MongoErrorCode["OPERATION_FAILED"] = 96] = "OPERATION_FAILED";
    MongoErrorCode[MongoErrorCode["NO_PROJECTION_FOUND"] = 97] = "NO_PROJECTION_FOUND";
    MongoErrorCode[MongoErrorCode["DB_PATH_IN_USE"] = 98] = "DB_PATH_IN_USE";
    MongoErrorCode[MongoErrorCode["UNSATISFIABLE_WRITE_CONCERN"] = 100] = "UNSATISFIABLE_WRITE_CONCERN";
    MongoErrorCode[MongoErrorCode["OUTDATED_CLIENT"] = 101] = "OUTDATED_CLIENT";
    MongoErrorCode[MongoErrorCode["INCOMPATIBLE_AUDIT_METADATA"] = 102] = "INCOMPATIBLE_AUDIT_METADATA";
    MongoErrorCode[MongoErrorCode["NEW_REPLICA_SET_CONFIGURATION_INCOMPATIBLE"] = 103] = "NEW_REPLICA_SET_CONFIGURATION_INCOMPATIBLE";
    MongoErrorCode[MongoErrorCode["NODE_NOT_ELECTABLE"] = 104] = "NODE_NOT_ELECTABLE";
    MongoErrorCode[MongoErrorCode["INCOMPATIBLE_SHARDING_METADATA"] = 105] = "INCOMPATIBLE_SHARDING_METADATA";
    MongoErrorCode[MongoErrorCode["DISTRIBUTED_CLOCK_SKEWED"] = 106] = "DISTRIBUTED_CLOCK_SKEWED";
    MongoErrorCode[MongoErrorCode["LOCK_FAILED"] = 107] = "LOCK_FAILED";
    MongoErrorCode[MongoErrorCode["INCONSISTENT_REPLICA_SET_NAMES"] = 108] = "INCONSISTENT_REPLICA_SET_NAMES";
    MongoErrorCode[MongoErrorCode["CONFIGURATION_IN_PROGRESS"] = 109] = "CONFIGURATION_IN_PROGRESS";
    MongoErrorCode[MongoErrorCode["CANNOT_INITIALIZE_NODE_WITH_DATA"] = 110] = "CANNOT_INITIALIZE_NODE_WITH_DATA";
    MongoErrorCode[MongoErrorCode["NOT_EXACT_VALUE_FIELD"] = 111] = "NOT_EXACT_VALUE_FIELD";
    MongoErrorCode[MongoErrorCode["WRITE_CONFLICT"] = 112] = "WRITE_CONFLICT";
    MongoErrorCode[MongoErrorCode["INITIAL_SYNC_FAILURE"] = 113] = "INITIAL_SYNC_FAILURE";
    MongoErrorCode[MongoErrorCode["INITIAL_SYNC_OPLOG_SOURCE_MISSING"] = 114] = "INITIAL_SYNC_OPLOG_SOURCE_MISSING";
    MongoErrorCode[MongoErrorCode["COMMAND_NOT_SUPPORTED"] = 115] = "COMMAND_NOT_SUPPORTED";
    MongoErrorCode[MongoErrorCode["DOC_TOO_LARGE_FOR_CAPPED"] = 116] = "DOC_TOO_LARGE_FOR_CAPPED";
    MongoErrorCode[MongoErrorCode["CONFLICTING_OPERATION_IN_PROGRESS"] = 117] = "CONFLICTING_OPERATION_IN_PROGRESS";
    MongoErrorCode[MongoErrorCode["NAMESPACE_NOT_SHARDED"] = 118] = "NAMESPACE_NOT_SHARDED";
    MongoErrorCode[MongoErrorCode["INVALID_SYNC_SOURCE"] = 119] = "INVALID_SYNC_SOURCE";
    MongoErrorCode[MongoErrorCode["OPLOG_START_MISSING"] = 120] = "OPLOG_START_MISSING";
    MongoErrorCode[MongoErrorCode["DOCUMENT_VALIDATION_FAILURE"] = 121] = "DOCUMENT_VALIDATION_FAILURE";
    MongoErrorCode[MongoErrorCode["OBSOLETE_READ_AFTER_OPTIME_TIMEOUT"] = 122] = "OBSOLETE_READ_AFTER_OPTIME_TIMEOUT";
    MongoErrorCode[MongoErrorCode["NOT_A_REPLICA_SET"] = 123] = "NOT_A_REPLICA_SET";
    MongoErrorCode[MongoErrorCode["INCOMPATIBLE_ELECTION_PROTOCOL"] = 124] = "INCOMPATIBLE_ELECTION_PROTOCOL";
    MongoErrorCode[MongoErrorCode["COMMAND_FAILED"] = 125] = "COMMAND_FAILED";
    MongoErrorCode[MongoErrorCode["RPC_PROTOCOL_NEGOTIATION_FAILED"] = 126] = "RPC_PROTOCOL_NEGOTIATION_FAILED";
    MongoErrorCode[MongoErrorCode["UNRECOVERABLE_ROLLBACK_ERROR"] = 127] = "UNRECOVERABLE_ROLLBACK_ERROR";
    MongoErrorCode[MongoErrorCode["LOCK_NOT_FOUND"] = 128] = "LOCK_NOT_FOUND";
    MongoErrorCode[MongoErrorCode["LOCK_STATE_CHANGE_FAILED"] = 129] = "LOCK_STATE_CHANGE_FAILED";
    MongoErrorCode[MongoErrorCode["SYMBOL_NOT_FOUND"] = 130] = "SYMBOL_NOT_FOUND";
    MongoErrorCode[MongoErrorCode["OBSOLETE_CONFIG_SERVERS_INCONSISTENT"] = 132] = "OBSOLETE_CONFIG_SERVERS_INCONSISTENT";
    MongoErrorCode[MongoErrorCode["FAILED_TO_SATISFY_READ_PREFERENCE"] = 133] = "FAILED_TO_SATISFY_READ_PREFERENCE";
    MongoErrorCode[MongoErrorCode["READ_CONCERN_MAJORITY_NOT_AVAILABLE_YET"] = 134] = "READ_CONCERN_MAJORITY_NOT_AVAILABLE_YET";
    MongoErrorCode[MongoErrorCode["STALE_TERM"] = 135] = "STALE_TERM";
    MongoErrorCode[MongoErrorCode["CAPPED_POSITION_LOST"] = 136] = "CAPPED_POSITION_LOST";
    MongoErrorCode[MongoErrorCode["INCOMPATIBLE_SHARDING_CONFIG_VERSION"] = 137] = "INCOMPATIBLE_SHARDING_CONFIG_VERSION";
    MongoErrorCode[MongoErrorCode["REMOTE_OPLOG_STALE"] = 138] = "REMOTE_OPLOG_STALE";
    MongoErrorCode[MongoErrorCode["JS_INTERPRETER_FAILURE"] = 139] = "JS_INTERPRETER_FAILURE";
    MongoErrorCode[MongoErrorCode["INVALID_SSL_CONFIGURATION"] = 140] = "INVALID_SSL_CONFIGURATION";
    MongoErrorCode[MongoErrorCode["SSL_HANDSHAKE_FAILED"] = 141] = "SSL_HANDSHAKE_FAILED";
    MongoErrorCode[MongoErrorCode["JS_UNCATCHABLE_ERROR"] = 142] = "JS_UNCATCHABLE_ERROR";
    MongoErrorCode[MongoErrorCode["CURSOR_IN_USE"] = 143] = "CURSOR_IN_USE";
    MongoErrorCode[MongoErrorCode["INCOMPATIBLE_CATALOG_MANAGER"] = 144] = "INCOMPATIBLE_CATALOG_MANAGER";
    MongoErrorCode[MongoErrorCode["POOLED_CONNECTIONS_DROPPED"] = 145] = "POOLED_CONNECTIONS_DROPPED";
    MongoErrorCode[MongoErrorCode["EXCEEDED_MEMORY_LIMIT"] = 146] = "EXCEEDED_MEMORY_LIMIT";
    MongoErrorCode[MongoErrorCode["Z_LIB_ERROR"] = 147] = "Z_LIB_ERROR";
    MongoErrorCode[MongoErrorCode["READ_CONCERN_MAJORITY_NOT_ENABLED"] = 148] = "READ_CONCERN_MAJORITY_NOT_ENABLED";
    MongoErrorCode[MongoErrorCode["NO_CONFIG_MASTER"] = 149] = "NO_CONFIG_MASTER";
    MongoErrorCode[MongoErrorCode["STALE_EPOCH"] = 150] = "STALE_EPOCH";
    MongoErrorCode[MongoErrorCode["OPERATION_CANNOT_BE_BATCHED"] = 151] = "OPERATION_CANNOT_BE_BATCHED";
    MongoErrorCode[MongoErrorCode["OPLOG_OUT_OF_ORDER"] = 152] = "OPLOG_OUT_OF_ORDER";
    MongoErrorCode[MongoErrorCode["CHUNK_TOO_BIG"] = 153] = "CHUNK_TOO_BIG";
    MongoErrorCode[MongoErrorCode["INCONSISTENT_SHARD_IDENTITY"] = 154] = "INCONSISTENT_SHARD_IDENTITY";
    MongoErrorCode[MongoErrorCode["CANNOT_APPLY_OPLOG_WHILE_PRIMARY"] = 155] = "CANNOT_APPLY_OPLOG_WHILE_PRIMARY";
    MongoErrorCode[MongoErrorCode["OBSOLETE_NEEDS_DOCUMENT_MOVE"] = 156] = "OBSOLETE_NEEDS_DOCUMENT_MOVE";
    MongoErrorCode[MongoErrorCode["CAN_REPAIR_TO_DOWNGRADE"] = 157] = "CAN_REPAIR_TO_DOWNGRADE";
    MongoErrorCode[MongoErrorCode["MUST_UPGRADE"] = 158] = "MUST_UPGRADE";
    MongoErrorCode[MongoErrorCode["DURATION_OVERFLOW"] = 159] = "DURATION_OVERFLOW";
    MongoErrorCode[MongoErrorCode["MAX_STALENESS_OUT_OF_RANGE"] = 160] = "MAX_STALENESS_OUT_OF_RANGE";
    MongoErrorCode[MongoErrorCode["INCOMPATIBLE_COLLATION_VERSION"] = 161] = "INCOMPATIBLE_COLLATION_VERSION";
    MongoErrorCode[MongoErrorCode["COLLECTION_IS_EMPTY"] = 162] = "COLLECTION_IS_EMPTY";
    MongoErrorCode[MongoErrorCode["ZONE_STILL_IN_USE"] = 163] = "ZONE_STILL_IN_USE";
    MongoErrorCode[MongoErrorCode["INITIAL_SYNC_ACTIVE"] = 164] = "INITIAL_SYNC_ACTIVE";
    MongoErrorCode[MongoErrorCode["VIEW_DEPTH_LIMIT_EXCEEDED"] = 165] = "VIEW_DEPTH_LIMIT_EXCEEDED";
    MongoErrorCode[MongoErrorCode["COMMAND_NOT_SUPPORTED_ON_VIEW"] = 166] = "COMMAND_NOT_SUPPORTED_ON_VIEW";
    MongoErrorCode[MongoErrorCode["OPTION_NOT_SUPPORTED_ON_VIEW"] = 167] = "OPTION_NOT_SUPPORTED_ON_VIEW";
    MongoErrorCode[MongoErrorCode["INVALID_PIPELINE_OPERATOR"] = 168] = "INVALID_PIPELINE_OPERATOR";
    MongoErrorCode[MongoErrorCode["COMMAND_ON_SHARDED_VIEW_NOT_SUPPORTED_ON_MONGOD"] = 169] = "COMMAND_ON_SHARDED_VIEW_NOT_SUPPORTED_ON_MONGOD";
    MongoErrorCode[MongoErrorCode["TOO_MANY_MATCHING_DOCUMENTS"] = 170] = "TOO_MANY_MATCHING_DOCUMENTS";
    MongoErrorCode[MongoErrorCode["CANNOT_INDEX_PARALLEL_ARRAYS"] = 171] = "CANNOT_INDEX_PARALLEL_ARRAYS";
    MongoErrorCode[MongoErrorCode["TRANSPORT_SESSION_CLOSED"] = 172] = "TRANSPORT_SESSION_CLOSED";
    MongoErrorCode[MongoErrorCode["TRANSPORT_SESSION_NOT_FOUND"] = 173] = "TRANSPORT_SESSION_NOT_FOUND";
    MongoErrorCode[MongoErrorCode["TRANSPORT_SESSION_UNKNOWN"] = 174] = "TRANSPORT_SESSION_UNKNOWN";
    MongoErrorCode[MongoErrorCode["QUERY_PLAN_KILLED"] = 175] = "QUERY_PLAN_KILLED";
    MongoErrorCode[MongoErrorCode["FILE_OPEN_FAILED"] = 176] = "FILE_OPEN_FAILED";
    MongoErrorCode[MongoErrorCode["ZONE_NOT_FOUND"] = 177] = "ZONE_NOT_FOUND";
    MongoErrorCode[MongoErrorCode["RANGE_OVERLAP_CONFLICT"] = 178] = "RANGE_OVERLAP_CONFLICT";
    MongoErrorCode[MongoErrorCode["WINDOWS_PDH_ERROR"] = 179] = "WINDOWS_PDH_ERROR";
    MongoErrorCode[MongoErrorCode["BAD_PERF_COUNTER_PATH"] = 180] = "BAD_PERF_COUNTER_PATH";
    MongoErrorCode[MongoErrorCode["AMBIGUOUS_INDEX_KEY_PATTERN"] = 181] = "AMBIGUOUS_INDEX_KEY_PATTERN";
    MongoErrorCode[MongoErrorCode["INVALID_VIEW_DEFINITION"] = 182] = "INVALID_VIEW_DEFINITION";
    MongoErrorCode[MongoErrorCode["CLIENT_METADATA_MISSING_FIELD"] = 183] = "CLIENT_METADATA_MISSING_FIELD";
    MongoErrorCode[MongoErrorCode["CLIENT_METADATA_APP_NAME_TOO_LARGE"] = 184] = "CLIENT_METADATA_APP_NAME_TOO_LARGE";
    MongoErrorCode[MongoErrorCode["CLIENT_METADATA_DOCUMENT_TOO_LARGE"] = 185] = "CLIENT_METADATA_DOCUMENT_TOO_LARGE";
    MongoErrorCode[MongoErrorCode["CLIENT_METADATA_CANNOT_BE_MUTATED"] = 186] = "CLIENT_METADATA_CANNOT_BE_MUTATED";
    MongoErrorCode[MongoErrorCode["LINEARIZABLE_READ_CONCERN_ERROR"] = 187] = "LINEARIZABLE_READ_CONCERN_ERROR";
    MongoErrorCode[MongoErrorCode["INCOMPATIBLE_SERVER_VERSION"] = 188] = "INCOMPATIBLE_SERVER_VERSION";
    MongoErrorCode[MongoErrorCode["PRIMARY_STEPPED_DOWN"] = 189] = "PRIMARY_STEPPED_DOWN";
    MongoErrorCode[MongoErrorCode["MASTER_SLAVE_CONNECTION_FAILURE"] = 190] = "MASTER_SLAVE_CONNECTION_FAILURE";
    MongoErrorCode[MongoErrorCode["OBSOLETE_BALANCER_LOST_DISTRIBUTED_LOCK"] = 191] = "OBSOLETE_BALANCER_LOST_DISTRIBUTED_LOCK";
    MongoErrorCode[MongoErrorCode["FAIL_POINT_ENABLED"] = 192] = "FAIL_POINT_ENABLED";
    MongoErrorCode[MongoErrorCode["NO_SHARDING_ENABLED"] = 193] = "NO_SHARDING_ENABLED";
    MongoErrorCode[MongoErrorCode["BALANCER_INTERRUPTED"] = 194] = "BALANCER_INTERRUPTED";
    MongoErrorCode[MongoErrorCode["VIEW_PIPELINE_MAX_SIZE_EXCEEDED"] = 195] = "VIEW_PIPELINE_MAX_SIZE_EXCEEDED";
    MongoErrorCode[MongoErrorCode["INVALID_INDEX_SPECIFICATION_OPTION"] = 197] = "INVALID_INDEX_SPECIFICATION_OPTION";
    MongoErrorCode[MongoErrorCode["OBSOLETE_RECEIVED_OP_REPLY_MESSAGE"] = 198] = "OBSOLETE_RECEIVED_OP_REPLY_MESSAGE";
    MongoErrorCode[MongoErrorCode["REPLICA_SET_MONITOR_REMOVED"] = 199] = "REPLICA_SET_MONITOR_REMOVED";
    MongoErrorCode[MongoErrorCode["CHUNK_RANGE_CLEANUP_PENDING"] = 200] = "CHUNK_RANGE_CLEANUP_PENDING";
    MongoErrorCode[MongoErrorCode["CANNOT_BUILD_INDEX_KEYS"] = 201] = "CANNOT_BUILD_INDEX_KEYS";
    MongoErrorCode[MongoErrorCode["NETWORK_INTERFACE_EXCEEDED_TIME_LIMIT"] = 202] = "NETWORK_INTERFACE_EXCEEDED_TIME_LIMIT";
    MongoErrorCode[MongoErrorCode["SHARDING_STATE_NOT_INITIALIZED"] = 203] = "SHARDING_STATE_NOT_INITIALIZED";
    MongoErrorCode[MongoErrorCode["TIME_PROOF_MISMATCH"] = 204] = "TIME_PROOF_MISMATCH";
    MongoErrorCode[MongoErrorCode["CLUSTER_TIME_FAILS_RATE_LIMITER"] = 205] = "CLUSTER_TIME_FAILS_RATE_LIMITER";
    MongoErrorCode[MongoErrorCode["NO_SUCH_SESSION"] = 206] = "NO_SUCH_SESSION";
    MongoErrorCode[MongoErrorCode["INVALID_UUID"] = 207] = "INVALID_UUID";
    MongoErrorCode[MongoErrorCode["TOO_MANY_LOCKS"] = 208] = "TOO_MANY_LOCKS";
    MongoErrorCode[MongoErrorCode["STALE_CLUSTER_TIME"] = 209] = "STALE_CLUSTER_TIME";
    MongoErrorCode[MongoErrorCode["CANNOT_VERIFY_AND_SIGN_LOGICAL_TIME"] = 210] = "CANNOT_VERIFY_AND_SIGN_LOGICAL_TIME";
    MongoErrorCode[MongoErrorCode["KEY_NOT_FOUND"] = 211] = "KEY_NOT_FOUND";
    MongoErrorCode[MongoErrorCode["INCOMPATIBLE_ROLLBACK_ALGORITHM"] = 212] = "INCOMPATIBLE_ROLLBACK_ALGORITHM";
    MongoErrorCode[MongoErrorCode["DUPLICATE_SESSION"] = 213] = "DUPLICATE_SESSION";
    MongoErrorCode[MongoErrorCode["AUTHENTICATION_RESTRICTION_UNMET"] = 214] = "AUTHENTICATION_RESTRICTION_UNMET";
    MongoErrorCode[MongoErrorCode["DATABASE_DROP_PENDING"] = 215] = "DATABASE_DROP_PENDING";
    MongoErrorCode[MongoErrorCode["ELECTION_IN_PROGRESS"] = 216] = "ELECTION_IN_PROGRESS";
    MongoErrorCode[MongoErrorCode["INCOMPLETE_TRANSACTION_HISTORY"] = 217] = "INCOMPLETE_TRANSACTION_HISTORY";
    MongoErrorCode[MongoErrorCode["UPDATE_OPERATION_FAILED"] = 218] = "UPDATE_OPERATION_FAILED";
    MongoErrorCode[MongoErrorCode["FTDC_PATH_NOT_SET"] = 219] = "FTDC_PATH_NOT_SET";
    MongoErrorCode[MongoErrorCode["FTDC_PATH_ALREADY_SET"] = 220] = "FTDC_PATH_ALREADY_SET";
    MongoErrorCode[MongoErrorCode["INDEX_MODIFIED"] = 221] = "INDEX_MODIFIED";
    MongoErrorCode[MongoErrorCode["CLOSE_CHANGE_STREAM"] = 222] = "CLOSE_CHANGE_STREAM";
    MongoErrorCode[MongoErrorCode["ILLEGAL_OP_MSG_FLAG"] = 223] = "ILLEGAL_OP_MSG_FLAG";
    MongoErrorCode[MongoErrorCode["QUERY_FEATURE_NOT_ALLOWED"] = 224] = "QUERY_FEATURE_NOT_ALLOWED";
    MongoErrorCode[MongoErrorCode["TRANSACTION_TOO_OLD"] = 225] = "TRANSACTION_TOO_OLD";
    MongoErrorCode[MongoErrorCode["ATOMICITY_FAILURE"] = 226] = "ATOMICITY_FAILURE";
    MongoErrorCode[MongoErrorCode["CANNOT_IMPLICITLY_CREATE_COLLECTION"] = 227] = "CANNOT_IMPLICITLY_CREATE_COLLECTION";
    MongoErrorCode[MongoErrorCode["SESSION_TRANSFER_INCOMPLETE"] = 228] = "SESSION_TRANSFER_INCOMPLETE";
    MongoErrorCode[MongoErrorCode["MUST_DOWNGRADE"] = 229] = "MUST_DOWNGRADE";
    MongoErrorCode[MongoErrorCode["D_N_S_HOST_NOT_FOUND"] = 230] = "D_N_S_HOST_NOT_FOUND";
    MongoErrorCode[MongoErrorCode["D_N_S_PROTOCOL_ERROR"] = 231] = "D_N_S_PROTOCOL_ERROR";
    MongoErrorCode[MongoErrorCode["MAX_SUB_PIPELINE_DEPTH_EXCEEDED"] = 232] = "MAX_SUB_PIPELINE_DEPTH_EXCEEDED";
    MongoErrorCode[MongoErrorCode["TOO_MANY_DOCUMENT_SEQUENCES"] = 233] = "TOO_MANY_DOCUMENT_SEQUENCES";
    MongoErrorCode[MongoErrorCode["RETRY_CHANGE_STREAM"] = 234] = "RETRY_CHANGE_STREAM";
    MongoErrorCode[MongoErrorCode["INTERNAL_ERROR_NOT_SUPPORTED"] = 235] = "INTERNAL_ERROR_NOT_SUPPORTED";
    MongoErrorCode[MongoErrorCode["FOR_TESTING_ERROR_EXTRA_INFO"] = 236] = "FOR_TESTING_ERROR_EXTRA_INFO";
    MongoErrorCode[MongoErrorCode["CURSOR_KILLED"] = 237] = "CURSOR_KILLED";
    MongoErrorCode[MongoErrorCode["NOT_IMPLEMENTED"] = 238] = "NOT_IMPLEMENTED";
    MongoErrorCode[MongoErrorCode["SNAPSHOT_TOO_OLD"] = 239] = "SNAPSHOT_TOO_OLD";
    MongoErrorCode[MongoErrorCode["DNS_RECORD_TYPE_MISMATCH"] = 240] = "DNS_RECORD_TYPE_MISMATCH";
    MongoErrorCode[MongoErrorCode["CONVERSION_FAILURE"] = 241] = "CONVERSION_FAILURE";
    MongoErrorCode[MongoErrorCode["CANNOT_CREATE_COLLECTION"] = 242] = "CANNOT_CREATE_COLLECTION";
    MongoErrorCode[MongoErrorCode["INCOMPATIBLE_WITH_UPGRADED_SERVER"] = 243] = "INCOMPATIBLE_WITH_UPGRADED_SERVER";
    MongoErrorCode[MongoErrorCode["NOT_YET_AVAILABLE_TRANSACTION_ABORTED"] = 244] = "NOT_YET_AVAILABLE_TRANSACTION_ABORTED";
    MongoErrorCode[MongoErrorCode["BROKEN_PROMISE"] = 245] = "BROKEN_PROMISE";
    MongoErrorCode[MongoErrorCode["SNAPSHOT_UNAVAILABLE"] = 246] = "SNAPSHOT_UNAVAILABLE";
    MongoErrorCode[MongoErrorCode["PRODUCER_CONSUMER_QUEUE_BATCH_TOO_LARGE"] = 247] = "PRODUCER_CONSUMER_QUEUE_BATCH_TOO_LARGE";
    MongoErrorCode[MongoErrorCode["PRODUCER_CONSUMER_QUEUE_END_CLOSED"] = 248] = "PRODUCER_CONSUMER_QUEUE_END_CLOSED";
    MongoErrorCode[MongoErrorCode["STALE_DB_VERSION"] = 249] = "STALE_DB_VERSION";
    MongoErrorCode[MongoErrorCode["STALE_CHUNK_HISTORY"] = 250] = "STALE_CHUNK_HISTORY";
    MongoErrorCode[MongoErrorCode["NO_SUCH_TRANSACTION"] = 251] = "NO_SUCH_TRANSACTION";
    MongoErrorCode[MongoErrorCode["REENTRANCY_NOT_ALLOWED"] = 252] = "REENTRANCY_NOT_ALLOWED";
    MongoErrorCode[MongoErrorCode["FREE_MON_HTTP_IN_FLIGHT"] = 253] = "FREE_MON_HTTP_IN_FLIGHT";
    MongoErrorCode[MongoErrorCode["FREE_MON_HTTP_TEMPORARY_FAILURE"] = 254] = "FREE_MON_HTTP_TEMPORARY_FAILURE";
    MongoErrorCode[MongoErrorCode["FREE_MON_HTTP_PERMANENT_FAILURE"] = 255] = "FREE_MON_HTTP_PERMANENT_FAILURE";
    MongoErrorCode[MongoErrorCode["TRANSACTION_COMMITTED"] = 256] = "TRANSACTION_COMMITTED";
    MongoErrorCode[MongoErrorCode["TRANSACTION_TOO_LARGE"] = 257] = "TRANSACTION_TOO_LARGE";
    MongoErrorCode[MongoErrorCode["UNKNOWN_FEATURE_COMPATIBILITY_VERSION"] = 258] = "UNKNOWN_FEATURE_COMPATIBILITY_VERSION";
    MongoErrorCode[MongoErrorCode["KEYED_EXECUTOR_RETRY"] = 259] = "KEYED_EXECUTOR_RETRY";
    MongoErrorCode[MongoErrorCode["INVALID_RESUME_TOKEN"] = 260] = "INVALID_RESUME_TOKEN";
    MongoErrorCode[MongoErrorCode["TOO_MANY_LOGICAL_SESSIONS"] = 261] = "TOO_MANY_LOGICAL_SESSIONS";
    MongoErrorCode[MongoErrorCode["EXCEEDED_TIME_LIMIT"] = 262] = "EXCEEDED_TIME_LIMIT";
    MongoErrorCode[MongoErrorCode["OPERATION_NOT_SUPPORTED_IN_TRANSACTION"] = 263] = "OPERATION_NOT_SUPPORTED_IN_TRANSACTION";
    MongoErrorCode[MongoErrorCode["TOO_MANY_FILES_OPEN"] = 264] = "TOO_MANY_FILES_OPEN";
    MongoErrorCode[MongoErrorCode["ORPHANED_RANGE_CLEAN_UP_FAILED"] = 265] = "ORPHANED_RANGE_CLEAN_UP_FAILED";
    MongoErrorCode[MongoErrorCode["FAIL_POINT_SET_FAILED"] = 266] = "FAIL_POINT_SET_FAILED";
    MongoErrorCode[MongoErrorCode["PREPARED_TRANSACTION_IN_PROGRESS"] = 267] = "PREPARED_TRANSACTION_IN_PROGRESS";
    MongoErrorCode[MongoErrorCode["CANNOT_BACKUP"] = 268] = "CANNOT_BACKUP";
    MongoErrorCode[MongoErrorCode["DATA_MODIFIED_BY_REPAIR"] = 269] = "DATA_MODIFIED_BY_REPAIR";
    MongoErrorCode[MongoErrorCode["REPAIRED_REPLICA_SET_NODE"] = 270] = "REPAIRED_REPLICA_SET_NODE";
    MongoErrorCode[MongoErrorCode["JS_INTERPRETER_FAILURE_WITH_STACK"] = 271] = "JS_INTERPRETER_FAILURE_WITH_STACK";
    MongoErrorCode[MongoErrorCode["SOCKET_EXCEPTION"] = 9001] = "SOCKET_EXCEPTION";
    MongoErrorCode[MongoErrorCode["OBSOLETE_RECV_STALE_CONFIG"] = 9996] = "OBSOLETE_RECV_STALE_CONFIG";
    MongoErrorCode[MongoErrorCode["NOT_MASTER"] = 10107] = "NOT_MASTER";
    MongoErrorCode[MongoErrorCode["CANNOT_GROW_DOCUMENT_IN_CAPPED_NAMESPACE"] = 10003] = "CANNOT_GROW_DOCUMENT_IN_CAPPED_NAMESPACE";
    MongoErrorCode[MongoErrorCode["BSON_OBJECT_TOO_LARGE"] = 10334] = "BSON_OBJECT_TOO_LARGE";
    MongoErrorCode[MongoErrorCode["DUPLICATE_KEY"] = 11000] = "DUPLICATE_KEY";
    MongoErrorCode[MongoErrorCode["INTERRUPTED_AT_SHUTDOWN"] = 11600] = "INTERRUPTED_AT_SHUTDOWN";
    MongoErrorCode[MongoErrorCode["INTERRUPTED"] = 11601] = "INTERRUPTED";
    MongoErrorCode[MongoErrorCode["INTERRUPTED_DUE_TO_STEP_DOWN"] = 11602] = "INTERRUPTED_DUE_TO_STEP_DOWN";
    MongoErrorCode[MongoErrorCode["OUT_OF_DISK_SPACE"] = 14031] = "OUT_OF_DISK_SPACE";
    MongoErrorCode[MongoErrorCode["KEY_TOO_LONG"] = 17280] = "KEY_TOO_LONG";
    MongoErrorCode[MongoErrorCode["BACKGROUND_OPERATION_IN_PROGRESS_FOR_DATABASE"] = 12586] = "BACKGROUND_OPERATION_IN_PROGRESS_FOR_DATABASE";
    MongoErrorCode[MongoErrorCode["BACKGROUND_OPERATION_IN_PROGRESS_FOR_NAMESPACE"] = 12587] = "BACKGROUND_OPERATION_IN_PROGRESS_FOR_NAMESPACE";
    MongoErrorCode[MongoErrorCode["NOT_MASTER_OR_SECONDARY"] = 13436] = "NOT_MASTER_OR_SECONDARY";
    MongoErrorCode[MongoErrorCode["NOT_MASTER_NO_SLAVE_OK"] = 13435] = "NOT_MASTER_NO_SLAVE_OK";
    MongoErrorCode[MongoErrorCode["SHARD_KEY_TOO_BIG"] = 13334] = "SHARD_KEY_TOO_BIG";
    MongoErrorCode[MongoErrorCode["STALE_CONFIG"] = 13388] = "STALE_CONFIG";
    MongoErrorCode[MongoErrorCode["DATABASE_DIFFER_CASE"] = 13297] = "DATABASE_DIFFER_CASE";
    MongoErrorCode[MongoErrorCode["OBSOLETE_PREPARE_CONFIGS_FAILED"] = 13104] = "OBSOLETE_PREPARE_CONFIGS_FAILED";
})(MongoErrorCode = exports.MongoErrorCode || (exports.MongoErrorCode = {}));
//# sourceMappingURL=mongo-error-code.js.map