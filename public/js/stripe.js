/* eslint-disable */ /*because it is configured for node.js */
import axios from "axios";
import { showAlert } from "./alerts";

const stripe = Stripe(
  "pk_test_51NojgRFcZkqRpT2CJ0r1RzZoCcA3epvhnDaGeIdykiwdQJK40yMMZVkHFCXdoEMRuWntNinHOAlUznlkSw4W35AP00ltUSEWQk"
);

export const bookTour = async (tourId) => {
  try {
    // 1. Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2. Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert("error", err);
  }
};
