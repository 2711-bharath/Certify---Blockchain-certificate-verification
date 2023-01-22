<template>
  <div class="services">
    <h4>Services</h4>
    <div class="is-flex">
      <div class="card m-5" v-for="(service, i) in services" :key="i">
        <div>
          <span class="card-icon">
            <i :class="service.icon"></i>
          </span>
        </div>
        <div class="card-title my-4">
          {{ service.name }}
        </div>
        <div class="card-description">
          {{ service.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      services() {
        return [
          {
            name: "Proof of Existence",
            description:
              "Verify without the need for any third party. Generate your own Proof-of-Existence, Proof-of-Authenticity & Proof-of-Integrity of a file, record, document, certificate, degree on Blockchain.",
            icon: "fal fa-seedling",
          },

          {
            name: "Tamper Resistance",
            description:
              "Immutability is perhaps the most important benefit a blockchain provides. This tamper resistance is highly effective in preventing the counterfeiting of documents and document fraud.",
            icon: "fal fa-file-check",
          },

          {
            name: "Trusted",
            description:
              "Building towards a society of trust, Certificates on Blockchain is obviously just the first necessary step. A public decentralized network encourages trust to a whole new level.",
            icon: "fal fa-hands-helping",
          },

          {
            name: "Ease of Use",
            description:
              "Forget about the hassle and time taken to generate certificates now. Select from wide range of templates or design your own and issue certificates in bulk for your startup, institute or self-made courses.",
            icon: "fal fa-person-carry",
          },

          {
            name: "Distributed",
            description:
              "Lorem Ipsum je demonstrativní výplňový text používaný v tiskařském a knihařském průmyslu. Lorem Ipsum je považováno za standard v této oblasti on přežil i nástup elektronické sazby v podstatě beze změny. ",
            icon: "fal fa-users-class",
          },
        ];
      },
    },
  };
</script>

<style lang="scss" scoped>
  // colors
  $first: rgb(255, 99, 129);
  $second: rgb(252, 172, 150);
  $third: rgb(26, 218, 183);
  $fourth: rgb(73, 80, 246);
  $fifth: rgb(232, 48, 201);

  .services {
    .is-flex {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      .card {
        width: 388px;
        padding: 48px 24px 72px;
        text-align: center;

        &-title {
          font-size: 28px;
          font-weight: 500;
        }

        &-description {
          font-size: 20px;
        }

        &-icon {
          width: 100px;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          margin: 0 auto;
          box-shadow: 0 0.75em 1em -0.125em rgb(10 10 10 / 10%),
            0 0px 0 1px rgb(10 10 10 / 2%);
        }

        &:nth-child(1) {
          .card-icon {
            color: $first;
            border: 6px solid rgba($first, 0.5);
          }
        }
        &:nth-child(2) {
          .card-icon {
            color: $second;
            border: 6px solid rgba($second, 0.5);
          }
        }
        &:nth-child(3) {
          .card-icon {
            color: $third;
            border: 6px solid rgba($third, 0.5);
          }
        }
        &:nth-child(4) {
          .card-icon {
            color: $fourth;
            border: 6px solid rgba($fourth, 0.5);
          }
        }
        &:nth-child(5) {
          .card-icon {
            color: $fifth;
            border: 6px solid rgba($fifth, 0.5);
          }
        }
      }
    }
  }
</style>
