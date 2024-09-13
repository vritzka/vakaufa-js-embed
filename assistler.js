(function () {

    var initiated = false;

    function getScriptTag() {
        var scripts = document.getElementsByTagName('script');
        return scripts[scripts.length - 1]; // Last script is the one that loaded this JS file
    }

    var scriptTag = getScriptTag();

    var assistantId = scriptTag.getAttribute('data-assistant-id');
    var initialGreeting = scriptTag.getAttribute('data-initial-greeting');
    var width = scriptTag.getAttribute('data-width') || '300';
    var height = scriptTag.getAttribute('data-height') || '400';
    var icon = scriptTag.getAttribute('data-button-icon') || '💬';
    var position = scriptTag.getAttribute('data-position') || 'bottom-right';
    var embedInto = scriptTag.getAttribute('data-embed-into') || 'body';
    var embedElement = (embedInto == 'body') ? document.body : document.getElementById(embedInto);
    var backgroundColor = scriptTag.getAttribute('data-background-color') || '#007bff';
    var forceConversation = scriptTag.getAttribute('data-force-conversation') || false;
    forceConversation = (forceConversation == 'false' || forceConversation == '0') ? false : true;
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;

    // Adjust the width if screen is smaller than the specified width
    if (screenWidth < width) {
      width = screenWidth - 40; // Add some padding to the edges
    }

    // Adjust the height if screen is smaller than the specified height
    if (screenHeight < height) {
      height = screenHeight - 40; // Add some padding to the edges
    }


    var positionStyles = {
        'bottom-right': {
            bottom: '20px',
            right: '20px'
        },
        'bottom-left': {
            bottom: '20px',
            left: '20px'
        },
        'top-right': {
            top: '20px',
            right: '20px'
        },
        'top-left': {
            top: '20px',
            left: '20px'
        }
    };
    var chosenPosition = positionStyles[position] || positionStyles['bottom-right'];

    // Create the chat icon
    var chatIcon = document.createElement('div');
    chatIcon.id = 'assistler-icon';
    chatIcon.style.width = '60px';
    chatIcon.style.height = '60px';
    chatIcon.style.backgroundColor = backgroundColor;
    chatIcon.style.borderRadius = '50%';
    chatIcon.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    chatIcon.style.cursor = 'pointer';
    chatIcon.style.display = 'flex';
    chatIcon.style.justifyContent = 'center';
    chatIcon.style.alignItems = 'center';
    chatIcon.style.color = 'white';
    chatIcon.style.fontSize = '30px';
    chatIcon.style.zIndex = '10000';
    chatIcon.innerHTML = icon;

    if(embedInto == 'body') {
        chatIcon.style.position = 'fixed';
    } else {
        chatIcon.style.position = 'absolute';
    }

    // Apply the selected position for the icon
    Object.assign(chatIcon.style, chosenPosition);
    embedElement.appendChild(chatIcon);

    // Create the chatbot iframe container (with close button)
    var chatContainer = document.createElement('div');
    chatContainer.id = 'assistler-container';
    chatContainer.style.width = width + 'px';
    chatContainer.style.height = height + 'px';
    chatContainer.style.border = 'none';
    chatContainer.style.backgroundColor = "#000000";
    chatContainer.style.zIndex = '10001';
    chatContainer.style.display = 'none'; // Initially hidden
    Object.assign(chatContainer.style, chosenPosition);
    if(embedInto == 'body') {
        chatContainer.style.position = 'fixed';
        Object.assign(chatContainer.style, chosenPosition);
    } else {
        chatContainer.style.position = 'absolute';
        Object.assign(chatContainer.style, {
            top: '0px',
            left: '0px'
        });
    }


    // Create the chatbot iframe (inside the container)
    var chatIframe = document.createElement('iframe');
    chatIframe.id = 'chatbot-iframe';
    chatIframe.src = 'https://odd-lake-2494.ploomberapp.io?id=' + assistantId + '&initial_greeting=' + initialGreeting;
    chatIframe.style.width = '100%'; // Full width inside container
    chatIframe.style.height = '100%'; // Full height inside container
    chatIframe.style.border = 'none';

    chatContainer.appendChild(chatIframe);

    // Create close button
    var closeButton = document.createElement('div');
    closeButton.innerHTML = '&times;'; // Close button symbol (X)
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.width = '30px';
    closeButton.style.height = '30px';
    closeButton.style.color = '#fff';
    closeButton.style.backgroundColor = backgroundColor;
    closeButton.style.borderRadius = '50%';
    closeButton.style.cursor = 'pointer';
    closeButton.style.display = 'flex';
    closeButton.style.justifyContent = 'center';
    closeButton.style.alignItems = 'center';
    closeButton.style.fontSize = '20px';
    closeButton.style.lineHeight = '1'; 
    closeButton.style.zIndex = '100003'; // Ensure the close button is above the iframe

    chatContainer.appendChild(closeButton);

      function init_assistler() {

        if(initiated) {return true}

        initiated = true;
        embedElement.appendChild(chatContainer);
      };
    
    if(forceConversation) {
        init_assistler()
        chatContainer.style.display = 'block';
    };

    chatIcon.addEventListener('click', function () {
        if (chatContainer.style.display === 'none') {
            init_assistler();
            chatContainer.style.display = 'block'; // Show chat window
        } else {
            chatContainer.style.display = 'none'; // Hide chat window
        }
    });

    // Close the chatbot when the close button is clicked
    closeButton.addEventListener('click', function () {
        chatContainer.style.display = 'none'; // Hide chat window
    });

})();  