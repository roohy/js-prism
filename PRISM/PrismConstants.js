/**
 * Created by Ro0ohy on 11/15/2014.
 */

prism = prism || {};

prism.core = prism.core || {};

prism.core.prismConstants = {};

prism.core.prismConstants.REQUEST = 1;
prism.core.prismConstants.REPLY = 2;
prism.core.prismConstants.REQUEST_REPLY = 3;

//style constants

prism.core.prismConstants.DEFAULT = 100;

prism.core.prismConstants.C2_COMP = 101;
prism.core.prismConstants.C2_CONN = 102;
prism.core.prismConstants.C2_ARCH = 103;

prism.core.prismConstants.FILTER = 110;
prism.core.prismConstants.PIPE = 111;
prism.core.prismConstants.PIPE_FILTER_ARCH = 112;

prism.core.prismConstants.CLIENT = 120;
prism.core.prismConstants.SERVER = 121;
prism.core.prismConstants.CLIENT_SERVER_ARCH = 122;

prism.core.prismConstants.PUB_SUB_COMP = 130;
prism.core.prismConstants.PUB_SUB_CONN = 131;
prism.core.prismConstants.PUB_SUB_ARCH = 132;

prism.core.prismConstants.P2P_COMP = 140;
prism.core.prismConstants.P2P_ARCH = 141;


prism.core.prismConstants.Reflector = function(obj) {
    this.getProperties = function() {
        var properties = [];
        for (var prop in obj) {
            if (typeof obj[prop] == 'function') {
                properties.push(prop);
            }
        }
        return properties;
    };
}
