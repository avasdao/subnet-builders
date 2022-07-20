<template>
    <router-view />
</template>

<script>
/* Import modules. */
import { ethers } from 'ethers'

/* Import components. */
// import Banner from '@/components/Banner'
// import Header from '@/components/Header'
// import Footer from '@/components/Footer'

const ENDPOINT = 'https://subnet.homemadecrypto.com/ext/bc/'

export default {
    components: {
        // Banner,
        // Header,
        // Footer,
    },
    created: async function () {
        /* Initialize. */
        // this.$store.dispatch('init')

        /* Set Subnet ID. */
        const subnetid = '2q2msjTr9KhahzNJdidAkAWWPRrhxD4VJfoenoShoZwi3m8BVJ' // Homemade Crypto

        const rpcParams = {
            // url: 'https://smartbch.devops.cash/mainnet',
            // url: 'https://smartbch.fountainhead.cash/mainnet',
            url: `${ENDPOINT}${subnetid}/rpc`,
        }

        const network = {
            name: 'Homemade Crypto',
            chainId: 0x343a, // 13370
        }

        const provider = new ethers.providers.JsonRpcProvider(rpcParams, network)
        // console.log('PROVIDER', provider)

        // this.address = '0x26d74B95b69aa0290a5603548D45b59580DC0A63'

        this.blockNum = await provider.getBlockNumber()
        console.log('BLOCK NUM', this.blockNum)

        const block = await provider.getBlock(this.blockNum)
        console.log('BLOCK', block)

        const code = await provider.getCode('0x0200000000000000000000000000000000000001')
        console.log('CODE', code);

    },
}
</script>

<style>
.two-lines {
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 2; /* number of lines to show */
           line-clamp: 2;
   -webkit-box-orient: vertical;
}

.three-lines {
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 3; /* number of lines to show */
           line-clamp: 3;
   -webkit-box-orient: vertical;
}
</style>
