"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const endeavor = require("endeavor");
const search_variables_1 = require("../graphql/variables/search.variables");
const graphql_1 = require("../graphql/graphql");
class Anilist {
    static async MediaSearch(search) {
        return new Promise((resolve, reject) => {
            const query = graphql_1.GraphQL.SearchQL;
            const variables = search_variables_1.SearchVariables.Get(search, 1, 100, "ANIME");
            endeavor
                .queryAnilist({ query, variables })
                .then(result => {
                resolve(result);
            })
                .catch(error => {
                reject(error);
            });
        });
    }
    static async MediaQuery(id) {
        return new Promise((resolve, reject) => {
            const query = graphql_1.GraphQL.AnimeQL;
            const variables = search_variables_1.SearchVariables.Media(id);
            endeavor
                .queryAnilist({ query, variables })
                .then(result => {
                resolve(result);
            })
                .catch(error => {
                console.log(error);
            });
        });
    }
}
exports.Anilist = Anilist;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JlL2FuaWxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBc0M7QUFDdEMsNEVBQXdFO0FBQ3hFLGdEQUE2QztBQUU3QyxNQUFhLE9BQU87SUFDWCxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFjO1FBQzVDLE9BQU8sSUFBSSxPQUFPLENBQVMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDN0MsTUFBTSxLQUFLLEdBQUcsaUJBQU8sQ0FBQyxRQUFRLENBQUM7WUFDL0IsTUFBTSxTQUFTLEdBQUcsa0NBQWUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDL0QsUUFBUTtpQkFDTCxZQUFZLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUM7aUJBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDYixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEIsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDYixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFVO1FBQ3ZDLE9BQU8sSUFBSSxPQUFPLENBQVMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDN0MsTUFBTSxLQUFLLEdBQUcsaUJBQU8sQ0FBQyxPQUFPLENBQUM7WUFDOUIsTUFBTSxTQUFTLEdBQUcsa0NBQWUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDNUMsUUFBUTtpQkFDTCxZQUFZLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUM7aUJBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDYixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEIsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDYixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUE5QkQsMEJBOEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGVuZGVhdm9yID0gcmVxdWlyZShcImVuZGVhdm9yXCIpO1xyXG5pbXBvcnQgeyBTZWFyY2hWYXJpYWJsZXMgfSBmcm9tIFwiLi4vZ3JhcGhxbC92YXJpYWJsZXMvc2VhcmNoLnZhcmlhYmxlc1wiO1xyXG5pbXBvcnQgeyBHcmFwaFFMIH0gZnJvbSBcIi4uL2dyYXBocWwvZ3JhcGhxbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFuaWxpc3Qge1xyXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgTWVkaWFTZWFyY2goc2VhcmNoOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxvYmplY3Q+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgY29uc3QgcXVlcnkgPSBHcmFwaFFMLlNlYXJjaFFMO1xyXG4gICAgICBjb25zdCB2YXJpYWJsZXMgPSBTZWFyY2hWYXJpYWJsZXMuR2V0KHNlYXJjaCwgMSwgMTAwLCBcIkFOSU1FXCIpO1xyXG4gICAgICBlbmRlYXZvclxyXG4gICAgICAgIC5xdWVyeUFuaWxpc3QoeyBxdWVyeSwgdmFyaWFibGVzIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGFzeW5jIE1lZGlhUXVlcnkoaWQ6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPG9iamVjdD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBjb25zdCBxdWVyeSA9IEdyYXBoUUwuQW5pbWVRTDtcclxuICAgICAgY29uc3QgdmFyaWFibGVzID0gU2VhcmNoVmFyaWFibGVzLk1lZGlhKGlkKTtcclxuICAgICAgZW5kZWF2b3JcclxuICAgICAgICAucXVlcnlBbmlsaXN0KHsgcXVlcnksIHZhcmlhYmxlcyB9KVxyXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==