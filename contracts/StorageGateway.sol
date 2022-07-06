// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/*******************************************************************************
 *
 * Copyright (c) 2022 Ava's DAO
 * Released under the MIT License.
 *
 * SubnetGateway - A precompiled contract that provides a gateway to external
 *                 storage services like:
 *                   - IPFS
 *                   - AWS
 *                   - Storj
 *                   - Azure
 *                   - and much more..
 *
 * Version 22.7.6
 *
 * https://avasdao.org
 * support@avasdao.org
 */


/**
 * Storage Gateway
 *
 * This interface manages the precompile requests to the external
 * storage gateway.
 */
contract StorageGateway {
    bytes public memoryStored;

    /**
     * Get Storage
     *
     * User specifies a data identifier and network to query. Validators will
     * connect to the respective network and retrieve the data.
     */
    function getStorage(
        uint256 _cid,
        bytes8 _network,
        bool _isClustered
    ) public returns (bytes memory) {
        /* Initialize stored data holder. */
        bytes memory stored;

        /* Build request package. */
        bytes memory pkg = abi.encodePacked(
            _cid,
            _network,
            _isClustered
        );

        /* Perform assembly action. */
        assembly {
            /* Initialize free memory. */
            let freemem := mload(0x40)

            /* Append package to memory. */
            // let pkg := add(freemem, 12)

            /* Call precompiled contract. */
            // if iszero(staticcall(not(0), 0x53B, add(pkg, 32), 0xd5, stored, 0x40)) {
            if iszero(call(gas(), 0x53b, 0, 0, 0, pkg, 20)) {
                invalid()
            }

            /* Load stored data. */
            stored := mload(freemem)
        }

        /* Return stored data. */
        return stored;
    }

    /**
     * Set Storage
     *
     * User specifies a data identifier and network to query. Validators will
     * connect to the respective network and retrieve the data.
     */
    function setStorage(
        uint256 _cid,
        bytes8 _network,
        bool _isClustered,
        string calldata _data
    ) public returns (bytes memory) {
        /* Initialize stored data holder. */
        bytes memory stored;

        /* Build request package. */
        bytes memory pkg = abi.encodePacked(
            _cid,
            _network,
            _isClustered,
            _data
        );

        /* Perform assembly action. */
        assembly {
            /* Initialize free memory. */
            let freemem := mload(0x40)

            /* Append package to memory. */
            // let pkg := add(freemem, 12)

            /* Call precompiled contract. */
            // if iszero(staticcall(not(0), 0x53B, add(pkg, 32), 0xd5, stored, 0x40)) {
            if iszero(call(gas(), 0x53b, 0, 0, 0, pkg, 20)) {
                invalid()
            }

            /* Load stored data. */
            stored := mload(freemem)
        }

        /* Return stored data. */
        return stored;
    }
}
