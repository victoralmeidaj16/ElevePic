const admin = require('firebase-admin');

const serviceAccount = {
    "project_id": "elevepic",
    "client_email": "firebase-adminsdk-fbsvc@elevepic.iam.gserviceaccount.com",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCfzgrv/Sba+D5S\nI/7MTBL/a0HCxY7J6K8zmYFk6fkU0y/Php5DHxi9UcBSDD9K7ZCB+yQVllS3VHfl\nhPHb+vY0+uArbIFb0mp3KbHgKqxkif2lFAvza+TJugTophIJoeZqaxDlZ/1sEAHa\nUyEYBgO451TIp0Xb7KGUzVpto3/yfP35g1XPscyHglEstnfgAUk2BGcN5FxQl/sk\nvDfoNySfCX4L5M1vnFRTlQE9PKDJC7ZzdClhbZJ2dmmJvuPanAA0iU+D813E6rq5\nOkQCTMTiHVHWVxJI2rdNIcBvX2qHZ5hF8EMnij+wEogwZvCu8IkHK+Rw2ZkfEf/Q\n5qReX7urAgMBAAECggEAAtgJjsrMO1JdClyUoL5SPW4DUUi8KUpOr+Lkw07jCjFV\n8chqBM5gkNUlg70VdUTNpEDvAlyKBmpmgqGlvweNne5aOSICgIe5y4QYI8g7bpCc\nGg94xPmGRhn24DMJ/omwjloSBpsd24n1ya5ecbO0GXRlQfew53oj4ZnwwlaKC0Ur\nkc5g1dhwBXrDQ/nmaG/b1jsapeh80+9IOa5OtbGiv2A/ce5PePxTr4mJbkasT5yW\nxEiItGSOYqqcwM66ZSX27Ux/dbVQxv8JgAiJwTqCqmiuSDLlhW5MKEyRNF5xX2ar\n6laVMQC2tJddBrOnaHZMt7imn137kqDwqNuKdfMu/QKBgQDTwZNHfdyqWjplJoWG\nXebBBBjPXhbTvYbhKNIWiduhOoGHDzsfgYAv2/G7nV/0rcwl/bZ12+4SUNVqn6R2\n8pazflEPkvwcB4t9na6RGtzNAYt0QBe8+sZQo6gPQ4/QnuVkzsxRLqa6aBrPDnku\nYxsx0ZE5pgx+pZECtaFz5nf83QKBgQDBMbGIrzDYy4rLANIwlW0+k+q9uRRsXTjL\noawDvHIzQGcfk6SbtnIJwyl1NW1CF6umTldO63w2gCZyKxQgEL8Q3OPGNOJBCOXh\nGcgE9aWBR0jRm1gtCwqBFxvmZDCAEFDVGeuSXLywkKDR/MAOsyYvoR74fYlyDTkP\n2iUuvIKuJwKBgQC1H0XSSJ2OOE7qZeCf5YGSZuaxuFDeG6ZawIeyL4hkh55y31w6\nvpHeXcqOJzYEGwQbGsAOX2dq0yk4YgRSmXy9WrYLFDX/45Q0hcLi6o8h6shVTtz/\nD6DBKLp/E9LXJpIff6LTbYu+tXz4zfBo9Ow12ILXRGg7i3JVVvYaJG9NIQKBgFik\nambiqzDtw1L9n3N3PFa4G77NSteltkeIeJqGPofRhv9wCNkBTzW3fDAxQV5P6gw2\naczmM2n2Rq2fom5MAL7F+ySYYy+f24n7AFF2PGgiwwCZnE2egUVVyxFc6vv3gH8m\nk3XmYxVIZuGybJTSEjVMYh91yjiwZHwnhWP6TqOFAoGBAJFcH5mE34PZDc15z2xo\nz/fb3eyjTEyxT2AnTpybVJi9etC11ev+UGA70ZMc8nFSbCJ/HwgV9AeoBrm1WRm/\nOsj3tXyXvhrgjt4qi43kPxYR/BmIkijoe2iE9n1CIdbPfnKNimCvs9REhslE3Swb\n5mawdTQc7RgOxdeKZDq/8rO5\n-----END PRIVATE KEY-----\n"
};

async function testDatabaseConnections() {
    console.log("--- Testing Specific Database IDs ---");

    // The snapshot shows three possible DB names:
    // 1. database (Padrão, nativa)
    // 2. default (Enterprise, nativa)
    // 3. elevepicdb (Padrão, nativa)

    // We also need to test Realtime Database just in case, since the user's snippet referenced rtdb

    const dbsToTest = ['(default)', 'database', 'elevepicdb', 'default'];

    for (const dbId of dbsToTest) {
        console.log(`\nTesting database ID: "${dbId}"...`);
        try {
            // Need a fresh app instance for each setting change
            const app = admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            }, `app-${dbId}`);

            const db = admin.firestore(app);
            db.settings({ databaseId: dbId });

            const snapshot = await db.collection('styles').limit(1).get();
            console.log(`✅ SUCCESS! Database "${dbId}" is active! Contains ${snapshot.size} style documents.`);

            if (snapshot.size > 0) {
                console.log("Found document IDs:", snapshot.docs.map(d => d.id));
            }
        } catch (e) {
            console.error(`❌ FAILED for "${dbId}":`, e.message);
        }
    }
}

testDatabaseConnections();
