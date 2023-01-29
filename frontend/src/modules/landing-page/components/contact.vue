<template>
  <div class="contact p-3">
    Contact Us
    <div class="is-flex my-5">
      <div class="img px-4">
        <img src="./assets/contact-us.png" alt="image" />
      </div>
      <div class="content">
        <div class="div my-3">
          <div class="content-title">
            Storing Certificates using Blockchain System
          </div>
          <div class="content-description my-3">
            Stay updated with Certify project progress and updates in the
            blockchain system.
          </div>
        </div>
        <div class="content-footer">
          <a
            href="https://github.com/2711-bharath/Blockchain-certificate-verification"
            target="_blank"
          >
            <i class="fab fa-github fa-lg mx-2 mb-1"></i> Github
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .contact {
    background-color: #11103e;
    color: #fff;
    min-height: 50vh;

    .is-flex {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      flex-wrap: wrap;
    }

    .img {
      width: 30%;
      border-right: 1px solid #fff;
      border-bottom: 0px;
    }

    .content {
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      &-title {
        font-size: 36px;
        color: #fff;
      }

      &-description {
        font-size: 20px;
        color: rgba(255, 255, 255, 0.4);
      }

      a {
        font-size: 20px;
        color: #fff;
        .fab {
          color: rgba(255, 255, 255, 0.4);
        }
      }
    }

    @media only screen and (max-width: 600px) {
      .img {
        min-width: 330px;
        max-width: 600px;
        border-right: 0px;
        border-bottom: 1px solid #fff;
      }
      .content {
        width: 100vw;
      }
    }
  }
</style>
