<template>
  <div>
    <v-container grid-list-md>
      <v-layout justify-center row wrap>
        <v-flex >
          <v-card>
            <v-card-title primary-title>
              <v-container grid-list-md>
                <v-layout row wrap>
                  <v-flex md10>
                    <v-btn @click="order">
                      Order
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout row wrap>
                  <v-flex md6 v-if="demand">
                    <Demand :demand="demand" />
                  </v-flex>
                  <v-flex md6 v-if="offer">
                    <Offer :offer="offer" />
                  </v-flex>
                </v-layout>
              </v-container>
              <v-container grid-list-md>
                <v-layout row wrap>
                  <v-flex md12 v-if="liability">
                    <Liability :liability="liability" />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import { Token } from "robonomics-js";
import Demand from './Demand'
import Offer from './Offer'
import Liability from './Liability'
import * as config from '../config'
import getRobonomics from "../utils/robonomics";
import getIpfs from "../utils/ipfs";

let robonomics;

export default {
  name: 'Page',
  components: {
    Demand,
    Offer,
    Liability
  },
  data () {
    return {
      token: null,
      robonomicsStatus: false,
      price: {
        value: config.PRICE,
        valueStr: `${config.PRICE} ${config.TOKEN_SYMBOL}`
      },
      model: config.MODEL,
      lighthouse: {
        name: "",
        address: ""
      },
      demand: null,
      offer: null,
      liability: null
    };
  },
  created() {
    getIpfs()
      .then(() => getRobonomics())
      .then(r => {
        robonomics = r;
        robonomics.ready().then(() => {
          if (config.TOKEN) {
            this.token = new Token(robonomics.web3, config.TOKEN);
          } else {
            this.token = robonomics.xrt;
          }
          this.lighthouse.name = robonomics.lighthouse.name;
          this.lighthouse.address = robonomics.lighthouse.address;
          robonomics.onDemand(this.model, msg => {
            if (msg.sender === robonomics.account.address) {
              console.log("Demand", msg);
              this.demand = msg;
            }
          });
          robonomics.onOffer(this.model, msg => {
            console.log("Offer", msg);
            this.offer = msg;
          });
          robonomics.onLiability(liability => {
            console.log("Liability", liability);
            if (liability.model === this.model) {
                this.liability = liability;
            }
          });
          this.robonomicsStatus = true;
        });
      });
  },
  methods: {
    getObjective () {
      return axios.post(config.URL_GET_OBJECTIVE, '', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((r) => {
          if (r.data) {
            // console.log(r.data);
            // ipfsBagCat(r.data.objective, {}, (bag) => {
            //   console.log(bag.data)
            // })
            return r.data;
          }
          return false
        })
    },
    order () {
      web3.eth.getBlock("latest", (e, r) => {
        this.getObjective().then((obj) => {
          const demand = {
            model: this.model,
            objective: obj,
            token: this.token.address,
            cost: config.PRICE,
            lighthouse: robonomics.lighthouse.address,
            validator: config.VALIDATOR,
            validatorFee: 0,
            deadline: r.number + 1000
          };
          console.log("About to send a demand: ", demand);
          robonomics.sendDemand(demand, false);
        });
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
