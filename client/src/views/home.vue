<template>
    <el-container>
        <Nav></Nav>
        <el-container>
            <Menu :menuList="this.$store.state.menus.children"></Menu>
            <el-main class="fater-body">
                <el-breadcrumb v-if="this.$router.currentRoute.path != '/index' " class="fater-body-breadcrumb">
                    <el-breadcrumb-item>系统首页</el-breadcrumb-item>
                    <el-breadcrumb-item>{{ this.$router.currentRoute.name }}</el-breadcrumb-item>
                </el-breadcrumb>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<style>

</style>

<script>
    import Nav from "../components/nav.vue";
    import Menu from "../components/menu.vue";

    export default{
        
        data(){

            return {
                
            }
        },
        methods: {

        },
        components: {
            Nav,
            Menu
        }
    }
</script>