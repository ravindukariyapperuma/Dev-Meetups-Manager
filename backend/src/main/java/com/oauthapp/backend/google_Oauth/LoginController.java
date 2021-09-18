package com.oauthapp.backend.google_Oauth;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeRequestUrl;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.DateTime;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.calendar.CalendarScopes;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.calendar.model.EventAttendee;
import com.google.api.services.calendar.model.EventDateTime;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.List;

@Controller
public class LoginController {

    private static HttpTransport HTTP_TRANSPORT = new NetHttpTransport();
    private static JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();


    private static final String APPLICATION_NAME = "My_Dumy_User";

    private static final List<String> SCOPES = Arrays.asList(CalendarScopes.CALENDAR);



    @Value("${google.client.redirectUri}")
    private String redirectURI;


    public GoogleAuthorizationCodeFlow flow;


    private static final File DATA_STORE_FILE =
            new File(System.getProperty("G:\\ssd-new-assignment2\\Dev-Meetups-Manager\\backend\\credi"), ".credentials/doubleclicksearches_s.json");

    public static FileDataStoreFactory dataStoreFactory;


    public LoginController() throws IOException {
    }

    @PostConstruct
    public void init() throws Exception {


        dataStoreFactory = new FileDataStoreFactory(DATA_STORE_FILE);

        GoogleClientSecrets secrets = GoogleClientSecrets.load(JSON_FACTORY,
                new InputStreamReader(LoginController.class.getResourceAsStream("/goole_client_secrets.json")));

        flow = new GoogleAuthorizationCodeFlow.Builder(HTTP_TRANSPORT, JSON_FACTORY, secrets,SCOPES)
                .setDataStoreFactory(dataStoreFactory).build();


    }


    @GetMapping(value = {"/"})
    public String showHomePage() throws Exception {
        boolean isUserAuthenticated = false;

        Credential credential = flow.loadCredential(APPLICATION_NAME);

        if (credential != null) {
            boolean tokenValid = credential.refreshToken();
            if (tokenValid) {
                isUserAuthenticated = true;
            }
        }

        return isUserAuthenticated ? "dashboard.html" : "index.html";
    }


    @GetMapping(value = {"/googlesignin"})
    public void doGoogleSignIn(HttpServletResponse response) throws Exception {
        GoogleAuthorizationCodeRequestUrl url = flow.newAuthorizationUrl();
        String redirectURL = url.setRedirectUri(redirectURI).setAccessType("offline").build();
        response.sendRedirect(redirectURL);
    }

    @GetMapping(value = {"/oauth"})
    public String saveAuthorizationCode(HttpServletRequest request) throws Exception {
        String code = request.getParameter("code");
        if (code != null) {
            saveToken(code);

            return "dashboard.html";
        }
        return "index.html";


    }

    private void saveToken(String code) throws Exception {
        GoogleTokenResponse response = flow.newTokenRequest(code).setRedirectUri(redirectURI).execute();
        System.out.println("token response=" + response);
        flow.createAndStoreCredential(response, APPLICATION_NAME);
    }


    @GetMapping(value = {"/create-event"})
    public void createEvent(HttpServletResponse response) throws Exception {

        Credential cred = flow.loadCredential(APPLICATION_NAME);

        // Build a new authorized API client service.
        Calendar service = new Calendar.Builder(HTTP_TRANSPORT, JSON_FACTORY,cred)
                .setApplicationName("googlecalendarpringbootexample")
                .build();

        Event event = new Event()
                .setSummary("SSD Assignment Re-Cap")
                .setLocation("800 Howard St., San Francisco, CA 94103")
                .setDescription("A chance to hear more about Google's developer products.");

        DateTime startDateTime = new DateTime("2021-09-25T09:00:00-07:00");
        EventDateTime start = new EventDateTime()
                .setDateTime(startDateTime)
                .setTimeZone("America/Los_Angeles");
        event.setStart(start);

        DateTime endDateTime = new DateTime("2021-09-25T17:00:00-07:00");
        EventDateTime end = new EventDateTime()
                .setDateTime(endDateTime)
                .setTimeZone("America/Los_Angeles");
        event.setEnd(end);

//        String[] recurrence = new String[] {"RRULE:FREQ=DAILY;COUNT=2"};
//        event.setRecurrence(Arrays.asList(recurrence));

        EventAttendee[] attendees = new EventAttendee[]{
//                new EventAttendee().setEmail("ravindu.kariyapperuma@gmail.com"),
                new EventAttendee().setEmail("lahirulakruwan5@gmail.com"),
        };
        event.setAttendees(Arrays.asList(attendees));

//        EventReminder[] reminderOverrides = new EventReminder[] {
//                new EventReminder().setMethod("email").setMinutes(24 * 60),
//                new EventReminder().setMethod("popup").setMinutes(10),
//        };
//        Event.Reminders reminders = new Event.Reminders()
//                .setUseDefault(false)
//                .setOverrides(Arrays.asList(reminderOverrides));
//        event.setReminders(reminders);
        String calendarId = "primary";
        event = service.events().insert(calendarId, event).execute();
        System.out.println(event);
    }

}
