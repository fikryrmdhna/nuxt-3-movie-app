<template>
    <div class="bg-[#1E232B] footer relative">
        <v-container>
            <v-row class="justify-between pt-8 pb-6">
                <v-col cols="12" sm="4">
                    <p class="text-[#929292] text-xs">&#169 2021 MoovieTime. All rights reserved.</p>
                </v-col>
                <v-col cols="12" sm="4" class="flex justify-sm-center">
                    <img src="../assets/images/moovietime-logo-grey@2x.png" alt="footer logo" class="img-fluid">
                </v-col>
                <v-col cols="12" sm="4" class="text-sm-right">
                    <p class="text-[#929292] text-xs">Made with Nuxt JS v3</p>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<style scoped>
.footer::before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.2);
}
</style>
