<script lang="ts">
// import axios from 'axios'
import { useUserStore } from '../../store/modules/user'
export default {
    setup() {
        const userStore = useUserStore()
        return { userStore }
    },
    data:function(){
        return{
            vehicles:[] as any[]
        }
    },
    computed: {
        getId:() => {
            return (vehicle)=>{
                return vehicle.registration?`REGISTRATION: ${vehicle.registration}`:`VIN: ${vehicle.vin}`
            }
        }
    },
    beforeMount(){
        this.getVehicles()
    },
    methods:{
        getVehicles:function(){
            /* const store = this.userStore.getStore()
            axios({
                url: `${import.meta.env.VITE_APP_API_URL}/v1/orgs/${store?.id}/vehicles`,
                method: 'get',
            }).then((response)=>{
                this.vehicles = response.data.vehicles
            }) */
            
            this.vehicles = [
		    {
                "id": "135d61b4-b5e9-4c1a-9d57-905ec84ab682",
                "vin": "4S3BNBC64F3028266",
                "make": "Subaru",
                "model": "Legacy",
                "year": "2015",
                "trim": "Premium+All Weather Package",
                "lastStartup": "2023-07-19T23:35:32.000Z",
                "createdAt": "2023-06-30T21:49:02.655Z",
                "deviceId": "ea6a393f-549a-483b-84b1-cb2ccb3cb713",
                "tripCount": 65,
                "eventCounts": {
                    "fuel-stats-reported": 339,
                    "hard-accel": 7,
                    "hard-turn": 29,
                    "high-speed": 4,
                    "shutdown": 66,
                    "startup": 65,
                    "trip-completed": 65,
                    "trip-started": 65,
                    "trip-stopped": 65,
                    "trip-summary": 66
                },
                "overallGrade": "A",
                "driver": {
                    "id": "273ea324-9a7c-4890-b976-7615d8bb5ac2",
                    "driverCode": "kirk-test1",
                    "userId": "4fb13801-6abb-4b5c-9d93-a0b6509afff2",
                    "orgId": "10b142b9-6677-4882-9197-7ed27f6856d7",
                    "firstName": "Kirk",
                    "lastName": "Tucker",
                    "email": "kirk@vin.li",
                    "phone": "+14693233858",
                    "createdAt": "2020-06-02T20:16:41.677937Z",
                    "updatedAt": "2022-02-21T15:21:28.918423Z"
                },
                "icon": "https://static.d01.vin.li/driver-service/driver-device-icons/wagon-icon.png",
                "registration": "SUB8266",
                "isSharing": true,
                "startTime": "2023-06-28T00:00:00Z",
                "stopTime": null,
                "orgId": "10b142b9-6677-4882-9197-7ed27f6856d7",
                "status": {
                    "phoneHome": "2023-06-26T02:00:59.000Z",
                    "startup": "2023-07-19T23:35:32.000Z",
                    "shutdown": "2023-07-19T23:37:05.002Z",
                    "location": "2023-07-19T23:43:05.000Z",
                    "lat": 32.92695,
                    "lon": -96.87441,
                    "slug": "not-transmitting"
                },
                "supplier": {
                    "id": "9d03c117-2a11-4da4-b0d6-ed578290b299",
                    "name": "Munic",
                    "slug": "munic"
                },
                "dtcs": [],
                "energyCode": "PHEV/DIESEL"
            },
            {
                "id": "88162faa-c49a-4d19-8388-230efa04d59f",
                "vin": "XX357865095493719",
                "make": null,
                "model": null,
                "year": null,
                "trim": null,
                "lastStartup": "2023-06-09T14:40:56.698Z",
                "createdAt": "2023-06-09T14:40:03.582Z",
                "deviceId": "ff331a9b-b463-4d93-b49a-f1485759733a",
                "tripCount": 28,
                "eventCounts": {
                    "device-installed": 1,
                    "shutdown": 28,
                    "startup": 28,
                    "trip-completed": 28,
                    "trip-started": 29,
                    "trip-stopped": 30,
                    "trip-summary": 28
                },
                "overallGrade": "A",
                "driver": {
                    "id": "46d041f3-5197-4c5b-98c3-7a6dd0107b96",
                    "driverCode": "junk-test",
                    "userId": "23db9893-06ba-4a18-abb9-8be6c975af94",
                    "orgId": null,
                    "firstName": "",
                    "lastName": "",
                    "email": "junk@vin.li",
                    "phone": "555-5556",
                    "createdAt": "2023-06-13T04:06:09.447436Z",
                    "updatedAt": "2023-06-30T13:42:43.551969Z"
                },
                "icon": "",
                "registration": null,
                "isSharing": true,
                "startTime": "2023-05-01T00:00:00Z",
                "stopTime": null,
                "orgId": "10b142b9-6677-4882-9197-7ed27f6856d7",
                "status": {
                    "phoneHome": null,
                    "startup": "2023-06-05T09:21:33.000Z",
                    "shutdown": "2023-06-05T09:31:33.000Z",
                    "location": "2023-06-05T09:31:33.000Z",
                    "lat": 52.095841666666665,
                    "lon": -0.3004966666666667,
                    "slug": "not-transmitting"
                },
                "supplier": {
                    "id": "493005a3-9dd0-4d99-93ba-c20e99929ceb",
                    "name": "Airmax Standard",
                    "slug": "airmax-standard"
                },
                "dtcs": []
            }]
	    },
    }
}

</script>
<template>
    <div v-if="vehicles.length>0" class="columns">
        <div :key="n" v-for="(vehicle, n) in vehicles" class="column">
            <div class="card">
                <div class="card-content">
                    <h5>{{ getId(vehicle) }}</h5>
                </div>
            </div>
        </div>
    </div>
   
</template>