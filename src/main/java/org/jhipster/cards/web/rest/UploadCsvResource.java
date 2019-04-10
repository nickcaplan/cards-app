package org.jhipster.cards.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.cards.domain.Card;
import org.jhipster.cards.repository.CardRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;

/**
 * REST controller for uploading cards data via CSV.
 */
@RestController
@RequestMapping("/upload")
public class UploadCsvResource {

    private final Logger log = LoggerFactory.getLogger(UploadCsvResource.class);

    private final CardRepository cardRepository;

    public UploadCsvResource(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }


    /**
     * POST  /csv : Uploads new cards data contained within a CSV file. The file must contain data
     * in the following format: [bank name],[card number],[expiry date]
     *
     * <p>Note: A line of the file is valid if all of the following are true:
     * <li>There are exactly 3 elements separated by a comma</li>
     * <li>The bank name is less than 256 characters</li>
     * <li>The card number can be converted to a long</li>
     * <li>The expiry date is an 8 digit string in the form YYYYMMDD</li>
     * </p>
     *
     * <p>If any line is invalid, the line will be skipped but proceessing will continue
     * on the rest of the file.</p>
     *
     * @param inputStream THe file to be processed
     * @return the ResponseEntity indicating the success or otherwise of the request.
     */
    @PostMapping(path = "/csv", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @Timed
    public ResponseEntity<String> uploadCards(@RequestParam("inputStream") MultipartFile inputStream) throws URISyntaxException {
        log.debug("POST request received to upload cards from provided file");

        int lineNumber = 0;
        String line;

        try (BufferedReader br = new BufferedReader(new InputStreamReader((inputStream.getInputStream())))) {

            while ((line = br.readLine()) != null) {
                lineNumber++;
                String[] tokens = line.split("\\,");

                if (tokens.length != 3) {
                    log.error("Could not process line " + lineNumber + " as there were more then 3 elements, continuing with the rest of the file");
                    continue;
                }

                // Bank name
                String bankName = tokens[0];
                if (bankName.length() > 255) {
                    log.error("Could not process line " + lineNumber + " as bank name exceeds 255 characters, continuing with the rest of the file");
                    continue;
                }

                // Card number
                long cardNumber;
                try {
                    cardNumber = Long.valueOf(tokens[1]);
                } catch (NumberFormatException nfe) {
                    log.error("Could not parse card number on line " + lineNumber + ", continuing with the rest of the file");
                    continue;
                }

                // Expiry date
                String expiryDateAsString = tokens[2];

                if (expiryDateAsString.length() != 8) {
                    log.error("Could not parse expiry date on line " + lineNumber + ", continuing with the rest of the file");
                    continue;
                }

                Integer year;
                Integer month;
                Integer dayOfMonth;
                try {
                    year = Integer.valueOf(expiryDateAsString.substring(0, 4));
                    month = Integer.valueOf(expiryDateAsString.substring(4, 6));
                    dayOfMonth = Integer.valueOf(expiryDateAsString.substring(6, 8));
                } catch (NumberFormatException nfe) {
                    log.error("Could not parse expiry date on line " + lineNumber + ", continuing with the rest of the file");
                    continue;
                }

                log.debug("Successfully read line " + lineNumber + ", saving card");

                Card card = new Card();
                card.setBankName(bankName);
                card.setCardNumber(cardNumber);
                card.setExpiryDate(LocalDate.of(year, month, dayOfMonth));

                cardRepository.save(card);
            }

        } catch (IOException ioe) {
            log.error("Failed to read from file provided");
        }

        log.debug("File successfully uploaded");
        return ResponseEntity.created(new URI("/upload/csv/")).body("File successfully uploaded");
    }
}
